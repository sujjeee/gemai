import { getConfig } from "@/utils/get-config";
import { handleError } from "@/utils/handle-error";
import { TaskType } from "@google/generative-ai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const configInfo = await getConfig();

export const embeddingModel = new GoogleGenerativeAIEmbeddings({
  modelName: "embedding-001",
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  apiKey: configInfo?.apiKey ?? "<empty_string>",
  onFailedAttempt: (error) => {
    handleError(error);
  },
  stripNewLines: false
});
