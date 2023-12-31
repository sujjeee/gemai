import { getConfig } from "@/utils/get-config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const config = await getConfig();

export const model = new ChatGoogleGenerativeAI({
  temperature: 0.7,
  modelName: "gemini-pro",
  topK: 40,
  topP: 1,
  apiKey: config.apiKey,
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
