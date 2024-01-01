import { logger } from "@/utils/logger";
import Configstore from "configstore";

interface GemAIConfig {
  apiKey: string;
}
export async function getConfig() {
  const getConfig = new Configstore("gemai");

  if (!getConfig.size) {
    logger.error(
      "Missing configuration. Please use your API key and try logging in again."
    );
    logger.info("");
    process.exit(0);
  }

  const config = (await getConfig.all) as GemAIConfig;

  return config;
}
