import { pipeline, PretrainedOptions } from "@xenova/transformers/types/pipelines"
import { Embeddings } from "langchain/embeddings"
import { EmbeddingsParams } from "langchain/embeddings/base"

export class TransformersEmbeddings extends Embeddings {
  constructor(
    private readonly model: string = "Xenova/gte-small",
    readonly params: EmbeddingsParams = {},
    private readonly pretrainOptions: PretrainedOptions = {},
  ) {
    super(params)
  }

  async getEmbedding(
    text: string,
    precision: number = 7,
    options = { pooling: "mean", normalize: false },
  ): Promise<number[]> {
    const pipe = await pipeline("feature-extraction", this.model, this.pretrainOptions)
    const output = await pipe(text, options)
    const roundedOutput = Array.from(output.data as number[]).map((value: number) =>
      parseFloat(value.toFixed(precision)),
    )
    return Array.from(roundedOutput)
  }

  embedDocuments(documents: string[]): Promise<number[][]> {
    const docs = documents.map((document) => this.getEmbedding(document))
    return Promise.all(docs)
  }

  async embedQuery(document: string): Promise<number[]> {
    return await this.getEmbedding(document)
  }
}
