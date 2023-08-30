import { parseNumber } from "../../src/either"
import { ParseError } from "../../src/error/ParseError"

describe("Either", () => {
  beforeEach(async () => {
    // Nothing
  })

  const result1 = parseNumber("123").map((num) => num * 2)
  const result2 = parseNumber("hello").map((num) => num * 2)

  // console.log(result1); // Right { value: 246 }
  // console.log(result2); // Left { value: 'Invalid number' }

  it("parse valid number", () => {
    expect(result1.value).toBe(246)
  })

  it("parse valid invalid number", () => {
    expect(result2.value).toStrictEqual(new ParseError("NaN"))
  })
})
