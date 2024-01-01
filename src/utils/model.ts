import { getConfig } from "@/utils/get-config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const configInfo = await getConfig();

export const model = new ChatGoogleGenerativeAI({
  temperature: configInfo?.temperature ?? 0.7,
  modelName: "gemini-pro",
  topK: configInfo?.topK ?? 40,
  topP: configInfo?.topP ?? 1,
  apiKey: configInfo?.apiKey ?? "<empty_string>",
  maxOutputTokens: configInfo?.maxOutputTokens ?? 2048,
  cache: true,
  callbacks: [
    {
      handleLLMEnd() {
        console.log("\n");
      }
    }
  ]
});
