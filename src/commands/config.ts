import { getConfig } from "@/utils/get-config";
import { handleError } from "@/utils/handle-error";
import { logger } from "@/utils/logger";
import chalk from "chalk";
import { Command } from "commander";
import Configstore from "configstore";
import colorizeJson from "json-colorizer";
import ora from "ora";
import prompts from "prompts";

export const config = new Command()
  .name("config")
  .description("see your configured gemai credentails")
  .action(async () => {
    const spinner = ora("Getting config file...").start();

    const configInfo = await getConfig();

    if (!configInfo) {
      spinner.stop();
      logger.error(
        "Missing configuration. Please use your API key and try logging in again."
      );
      logger.info("");
      process.exit(0);
    }
    try {
      spinner.succeed("Configuration file successfully retrieved.");

      logger.info("");
      console.log(
        colorizeJson(JSON.stringify(configInfo, null, 2), {
          colors: {
            STRING_KEY: "white",
            STRING_LITERAL: "#65B741",
            NUMBER_LITERAL: "#7E30E1"
          }
        })
      );
      logger.info("");
      process.exit(0);
    } catch (error) {
      spinner.stop();
      handleError(error);
    }
  });

config
  .command("set")
  .description("update config file")
  .action(async () => {
    const configInfo = await getConfig();

    if (!configInfo) {
      logger.error(
        "Missing configuration. Please use your API key and try logging in again."
      );
      logger.info("");
      process.exit(0);
    }

    try {
      const options = await prompts(
        [
          {
            type: "text",
            name: "maxOutputTokens",
            message: "maxOutputTokens?",
            initial: 2048,
            validate: (value) =>
              value <= 2048 || "maxOutputTokens must be smaller than 2048"
          },
          {
            type: "text",
            name: "topK",
            message: "topK?",
            initial: 40,
            validate: (value) => value <= 100 || "topK must be smaller than 100"
          },
          {
            type: "text",
            name: "topP",
            message: "topP?",
            initial: 1,
            validate: (value) => value <= 1 || "topP must be smaller than 1"
          },
          {
            type: "text",
            name: "temperature",
            message: "temperature?",
            initial: 0.7,
            validate: (value) =>
              value <= 1 || "temperature must be smaller than 1"
          }
        ],
        {
          onCancel: () => {
            logger.info("");
            logger.warn("Configuration update cancelled.");
            logger.info("");
            process.exit(0);
          }
        }
      );

      const getconfig = new Configstore("gemai");

      getconfig.set("maxOutputTokens", options.maxOutputTokens);
      getconfig.set("topK", options.topK);
      getconfig.set("topP", options.topP);
      getconfig.set("temperature", options.temperature);

      logger.info("");
      logger.info(`${chalk.green("Success!")} Configuration updated.`);
      logger.info("");
    } catch (error) {
      handleError(error);
    }
  });
