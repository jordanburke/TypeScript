import { TransformersEmbeddings } from "../src"

describe("TransformersEmbeddings", () => {
  beforeEach(async () => {
    // Nothing
  })

  const embeddings = new TransformersEmbeddings()

  embeddings.getEmbedding("hello world").then((result) => {
    console.log(result)
  })

  // console.log(result1); // Some { value: 246 }
  // console.log(result2); // None

  it("parse valid number", () => {
    expect("hello").toBe("hello")
  })
})
