import { getConfig } from "@/utils/get-config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// TODO: fix this
const configInfo = await getConfig();
const config = configInfo ? configInfo.apiKey : "<empty_string>";

export const model = new ChatGoogleGenerativeAI({
  temperature: 0.7,
  modelName: "gemini-pro",
  topK: 40,
  topP: 1,
  apiKey: config,
  maxOutputTokens: 2048,
  callbacks: [
    {
      handleLLMEnd() {
        console.log("\n");
      }
    }
  ],
  cache: true
});
