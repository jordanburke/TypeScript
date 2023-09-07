import { ZodSchema, z } from "zod"
import { validationOptions, validationSchema } from "../src"

describe("validationOptions", () => {
  it("should return an error when validation fails", () => {
    const schema: ZodSchema<number> = z.number()
    const result = validationOptions.validate("string", schema)

    expect(result.error).toBeDefined()
    expect(result.value).toBeUndefined()
  })

  it("should return a value when validation succeeds", () => {
    const schema: ZodSchema<number> = z.number()
    const result = validationOptions.validate(123, schema)

    expect(result.error).toBeUndefined()
    expect(result.value).toBe(123)
  })
})

describe("validationSchema", () => {
  let logCallback: jest.Mock

  beforeEach(() => {
    logCallback = jest.fn()
  })

  it('should call logCallback with "none" when validationOptions is not provided', () => {
    const schema: ZodSchema<number> = z.number()
    const config = 123

    const result = validationSchema(schema, logCallback).validate(config, undefined as any)

    expect(logCallback).toHaveBeenCalledWith("none", config)
    expect(result).toBe(config)
  })

  it('should call logCallback with "error" when validation fails', () => {
    const schema: ZodSchema<number> = z.number()
    const config = "string"

    expect(() => {
      validationSchema(schema, logCallback).validate(config, validationOptions)
    }).toThrow()

    expect(logCallback).toHaveBeenCalledWith("error", expect.any(Object), expect.any(Object))
  })

  it('should call logCallback with "success" when validation succeeds', () => {
    const schema: ZodSchema<number> = z.number()
    const config = 123

    const result = validationSchema(schema, logCallback).validate(config, validationOptions)

    expect(logCallback).toHaveBeenCalledWith("success", expect.any(Object))
    expect(result).toEqual({ error: undefined, value: 123 })
  })
})
