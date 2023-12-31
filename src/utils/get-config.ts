import Configstore from "configstore";

interface GemAIConfig {
  apiKey: string;
}
export async function getConfig() {
  const getConfig = new Configstore("gemai");

  if (!getConfig.size) {
    throw new Error("Missing configuration. Please try logging in again.");
  }

  const config = (await getConfig.all) as GemAIConfig;

  return config;
}
