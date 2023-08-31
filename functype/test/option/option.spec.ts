import { option, Option, parseNumber } from "../../src"
import { ParseError } from "../../src/error/ParseError"

describe("Option", () => {
  beforeEach(async () => {
    // Nothing
  })

  const something: Option<string> = option("hello")
  const nothing: Option<string> = option()

  // console.log(result1); // Some { value: 246 }
  // console.log(result2); // None

  it("parse valid number", () => {
    expect(something.getOrElse("world")).toBe("hello")
  })

  it("map on Some", () => {
    expect(something.map((s) => s.length).getOrElse(0)).toBe(5)
  })

  it("parse invalid number", () => {
    expect(nothing.getOrElse("world")).toBe("world")
  })

  it("map on None", () => {
    expect(nothing.map(() => 10)).toEqual({})
  })
})
