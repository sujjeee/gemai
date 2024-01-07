import { embeddingModel } from "@/utils/models/embedding-model";
import type { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export async function getMemoryVectorStore<
  // biome-ignore lint: accept any here
  T extends Document<Record<string, any>>
>(globalData: T[]) {
  const splitter = new RecursiveCharacterTextSplitter({
    separators: ["\n\n", "\n", " "],
    chunkSize: 1000,
    chunkOverlap: 200
  });

  const dataOutput = await splitter.splitDocuments(globalData);

  const memoryStore = await MemoryVectorStore.fromDocuments(
    dataOutput,
    embeddingModel
  );

  return memoryStore;
}
