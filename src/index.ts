#!/usr/bin/env node

import { chat } from "@/commands/chat";
import { config } from "@/commands/config";
import { login } from "@/commands/login";
import { read } from "@/commands/read";
import { vision } from "@/commands/vision";
import { getPackageInfo } from "@/utils/get-package-info";
import { Command } from "commander";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  const packageInfo = await getPackageInfo();

  const program = new Command()
    .name("gemai")
    .description("AI chatbot in a terminal environment.")
    .version(
      packageInfo.version || "1.0.0",
      "-v, --version",
      "display the version number"
    );

  program
    .addCommand(login)
    .addCommand(config)
    .addCommand(chat)
    .addCommand(read)
    .addCommand(vision);

  program.parse();
}

main();
