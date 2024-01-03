import { getConfig } from "@/utils/get-config";
import { handleError } from "@/utils/handle-error";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const configInfo = await getConfig();

export const chatModel = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro",
  onFailedAttempt: (error) => {
    handleError(error);
  },
  temperature: configInfo?.temperature ?? 0.7,
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
