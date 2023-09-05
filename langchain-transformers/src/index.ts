import { PretrainedOptions } from "@xenova/transformers"
import { Embeddings, EmbeddingsParams } from "langchain/embeddings/base"
import { dynamicImport } from "@cspell/dynamic-import"
import { pipeline } from "@xenova/transformers/types/pipelines"

export class TransformersEmbeddings extends Embeddings {
  private _transformers = importTransformers()
  private _cached: ReturnType<typeof pipeline>

  constructor(
    private readonly model: string = "Xenova/gte-small",
    readonly params: EmbeddingsParams = {},
    private readonly pretrainOptions: PretrainedOptions = {},
  ) {
    super(params)
  }

  private async load() {
    if (this._cached === undefined) {
      const transformers = await this._transformers
      this._cached = transformers.pipeline("feature-extraction", this.model, this.pretrainOptions)
      return this._cached
    } else {
      return this._cached
    }
  }

  async getEmbedding(
    text: string,
    precision: number = 7,
    options = { pooling: "mean", normalize: false },
  ): Promise<number[]> {
    const transformers = await this._transformers
    const pipe = await this.load()
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

export const importTransformers = async () => {
  console.log("<Transformers>")
  try {
    if (!this) {
      const module = await dynamicImport<typeof import("@xenova/transformers")>(
        "@xenova/transformers",
        "import.meta.url",
      )
      console.info("@xenova/transformers Loaded via ESM")
      return module
    } else {
      const module = await dynamicImport<typeof import("@xenova/transformers")>("@xenova/transformers", __dirname)
      console.info("@xenova/transformers Loaded via CommonJS")
      return module
    }
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    console.info("</Transformers>")
  }
}
