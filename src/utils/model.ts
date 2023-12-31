import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const model = new ChatGoogleGenerativeAI({
  temperature: 0.7,
  modelName: "gemini-pro",
  topK: 40,
  topP: 1,
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
