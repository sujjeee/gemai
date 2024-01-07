import { handleError } from "@/utils/handle-error";
import { logger } from "@/utils/logger";
import { verify } from "@/utils/verify";
import chalk from "chalk";
import { Command } from "commander";
import Configstore from "configstore";
import ora from "ora";
import { z } from "zod";
import { configInfo } from "@/utils/constants";

const loginOptionsSchema = z.object({
  token: z.string().min(8, "Token must be at least 8 characters long")
});

export const login = new Command()
  .name("login")
  .description("configure your gemini api key")
  .argument("<token>", "api token for authentication")
  .action(async (token) => {
    const spinner = ora("Verifying user credentials...").start();
    try {
      const options = loginOptionsSchema.parse({ token });
      await verify({ apiKey: options.token });

      const defaultSettings = {
        apiKey: options.token,
    ...configInfo
      };

      const config = new Configstore("gemai/config");

      if (!config.path) {
        spinner.stop();
        handleError(new Error("Failed to create config file."));
      }

      // 1: clear the config
      config.clear();

      // 2: set new gemai credentials
      config.set(defaultSettings);

      spinner.succeed("Done");

      logger.info("");
      logger.info(
        `${chalk.green("Success!")} Gemini authentication completed.`
      );
      logger.info("");
      process.exit(0);
    } catch (error) {
      spinner.stop();
      handleError(error);
    }
  });
