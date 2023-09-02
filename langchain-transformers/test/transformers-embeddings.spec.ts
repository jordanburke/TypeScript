import { TransformersEmbeddings } from "../src"
import { beforeEach, describe, expect, it } from "@jest/globals"

describe("TransformersEmbeddings", () => {
  // This is needed because of a bug in the ONNX Runtime/Jest library
  // https://github.com/microsoft/onnxruntime/issues/16622
  const originalImplementation = Array.isArray
  Array.isArray = (arg: any): arg is any[] => {
    if (arg?.constructor.name === "Float32Array" || arg?.constructor.name === "BigInt64Array") {
      return true
    } else {
      return originalImplementation(arg)
    }
  }

  beforeEach(async () => {
    // Nothing
  })

  const embeddings = new TransformersEmbeddings()

  it("Valid Embeddings Array of 384", async () => {
    const results = await embeddings.getEmbedding("hello world")
    expect(results.length).toBe(384)
  })
})
