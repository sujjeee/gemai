import fs from "fs";
import readline from "readline";
import { getConfig } from "@/utils/get-config";
import { logger } from "@/utils/logger";
import { visionModel } from "@/utils/models/vision-model";
import { Command } from "commander";
import { HumanMessage, SystemMessage } from "langchain/schema";
import ora from "ora";

export const vision = new Command()
  .name("vision")
  .description("chat with image")
  .argument("<image path>", "path of the image")
  .action(async (path) => {
    console.log("path", path);
    const configInfo = await getConfig();

    if (!configInfo) {
      logger.error(
        "Missing configuration. Please use your API key and try logging in again."
      );
      logger.info("");
      process.exit(0);
    }

    const imageLoader = ora("analyzing..").start();
    const image = fs.readFileSync(path).toString("base64");

    if (!image) {
      logger.error("Please try to provide proper image path.");
      logger.info("");
      process.exit(0);
    }

    imageLoader.stop();

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
          "Please look at this image and answer the question that follows. You are an AI assistant who can see and understand images. Use your vision and knowledge to give a correct and relevant answer. Please answer in plain text format, without any markdown elements such as bold, italic, code, quote, or tables. When I ask something, you have to respond directly, concisely, and precisely, without any unnecessary commentary or phrases."
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

      switch (line.trim()) {
        case "exit":
          process.exit(0);
          // TODO: remove break later
          break;
        case "cls":
          console.clear();
          break;
        default: {
          spinner.start();
          const stream = await visionModel.stream(messages);

          for await (const chunk of stream) {
            if (spinner.isSpinning) {
              spinner.stop();
            }
            process.stdout.write(chunk.content as string);
          }
        }
      }
      rl.prompt();
    });

    rl.on("close", () => {
      process.exit(0);
    });
  });
