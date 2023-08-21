import {parseNumber} from "../../src/either";

describe("Either", () => {

  beforeEach(async () => {
    // Nothing
  })

  const result1 = parseNumber("123").map(num => num * 2);
  const result2 = parseNumber("hello").map(num => num * 2);

  console.log(result1); // Right { value: 246 }
  console.log(result2); // Left { value: 'Invalid number' }

  it("parse valid number", () => {
    expect(parseNumber("123").map(num => num * 2).value).toBe(246)
  })

  it("parse valid invalid number", () => {
    expect(parseNumber("hello").map(num => num * 2).value).toBe("Invalid number")
  })
})
