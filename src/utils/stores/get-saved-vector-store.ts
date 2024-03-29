import { promises as fsPromises } from "fs";
import { dirname, join } from "path";
import { getNanoid } from "@/utils/get-nanoid";
import { embeddingModel } from "@/utils/models/embedding-model";
import optionsSchema from "@/utils/validations";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import type { Document } from "@langchain/core/documents";
import Configstore from "configstore";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as z from "zod";

const options = optionsSchema.pick({
  location: true,
  name: true,
  save: true
});

type agrs = z.infer<typeof options>;

export async function getSavedVectorStore<
  // biome-ignore lint: accept any here
  T extends Document<Record<string, any>>
>(globalData: T[], options: agrs): Promise<FaissStore> {
  try {
    const config = new Configstore("gemai/config");
    const folder = dirname(config.path);
    const store = join(folder, options.name ?? getNanoid());

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200
    });

    if (options.save) {
      try {
        await fsPromises.rm(store, { recursive: true, force: true });
        await fsPromises.mkdir(store);
      } catch (err) {
        throw new Error(`${err}`);
      }

      const dataOutput = await splitter.splitDocuments(globalData);

      const vectorStore = await FaissStore.fromDocuments(
        dataOutput,
        embeddingModel
      );

      try {
        await vectorStore.save(store);
      } catch (err) {
        throw new Error(`${err}`);
      }
    }

    const loadedVectorStore = await FaissStore.load(
      options.location ? options.location : store,
      embeddingModel
    );

    return loadedVectorStore;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
