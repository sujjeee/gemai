import Configstore from "configstore";

interface GemAIConfig {
  apiKey: string;
  maxOutputTokens: number;
  topK: number;
  topP: number;
  temperature: number;
}

export async function getConfig() {
  const getConfig = new Configstore("gemai");

  if (!getConfig.size) {
    return null;
  }

  const config = (await getConfig.all) as GemAIConfig;

  return config;
}
