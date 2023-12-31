#!/usr/bin/env node

import { chat } from "@/commands/chat";
import { config } from "@/commands/config";
import { login } from "@/commands/login";

import { Command } from "commander";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

function main() {
  const program = new Command()
    .name("gemai")
    .description("AI chatbot in a terminal environment.")
    .version("1.0.0", "-v, --version", "display the version number");

  program.addCommand(login).addCommand(config);
  program.addCommand(chat);
  program.parse();
}

main();
