import readline from "readline";
import { getChatMessage } from "@/utils/constants";
import { getConfig } from "@/utils/get-config";
import { handleError } from "@/utils/handle-error";
import { logger } from "@/utils/logger";
import { chatModel } from "@/utils/models/chat-model";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Command } from "commander";
import ora from "ora";

export const chat = new Command()
  .name("chat")
  .description("chat with ai")
  .action(async () => {
    try {
      const configInfo = await getConfig();

      if (!configInfo) {
        logger.error(
          "Missing configuration. Please use your API key and try logging in again."
        );
        logger.info("");
        process.exit(0);
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "~ ",
        terminal: false
      });

      const spinner = ora("thinking..");
      logger.success("Hello! How can I help you?");
      logger.info("");

      rl.prompt();

      rl.on("line", async (line) => {
        switch (line.trim()) {
          case "exit":
            process.exit(0);
            // TODO: remove break later
            break;
          case "cls":
            console.clear();
            break;
          default: {
            rl.pause();
            spinner.start();
            const parser = new StringOutputParser();
            const stream = await chatModel
              .pipe(parser)
              .stream(getChatMessage(line.trim()));

            for await (const chunk of stream) {
              if (spinner.isSpinning) {
                spinner.stop();
              }
              process.stdout.write(chunk);
            }
          }
        }

        // INFO: this is for resetting spinner text
        spinner.text = "thinking..";
        rl.resume();
        rl.prompt();
      });

      rl.on("close", () => {
        process.exit(0);
      });
    } catch (error) {
      handleError(error);
    }
  });
