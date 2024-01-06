import fs from "fs";
import readline from "readline";
import { getConfig } from "@/utils/get-config";
import { handleError } from "@/utils/handle-error";
import { logger } from "@/utils/logger";
import { visionModel } from "@/utils/models/vision-model";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Command } from "commander";
import ora from "ora";

export const vision = new Command()
  .name("vision")
  .description("chat with image")
  .argument("<image path>", "path of the image")
  .action(async (path) => {
    try {
      const configInfo = await getConfig();

      if (!configInfo) {
        logger.error(
          "Missing configuration. Please use your API key and try logging in again."
        );
        logger.info("");
        process.exit(0);
      }

      const imageLoader = ora("analyzing..").start();

      let image: string;

      try {
        image = fs.readFileSync(path).toString("base64");
        imageLoader.stop();
      } catch (error) {
        imageLoader.stop();
        handleError(error);
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "~ ",
        terminal: false
      });

      logger.success("Hello! How can I help you with this image?");
      logger.info("");

      rl.prompt();

      const spinner = ora("thinking..");

      rl.on("line", async (line) => {
        const messages = [
          new SystemMessage(
            "Please look at this image and answer the question that follows. You are an AI assistant who can see and understand images. Use your vision and knowledge to give a correct and relevant answer. Please answer in plain text format, without any markdown elements such as bold, italic, code, quote, or tables. When I ask a question, please respond directly, providing a detailed view based solely on the image without any unnecessary commentary or phrases."
          ),
          new HumanMessage({
            content: [
              {
                type: "text",
                text: line.trim()
              },
              {
                type: "image_url",
                image_url: `data:image/png;base64,${image}`
              }
            ]
          })
        ];

        setTimeout(() => {
          spinner.text = "please wait..";
        }, 5000);

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
            const stream = await visionModel.pipe(parser).stream(messages);

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
