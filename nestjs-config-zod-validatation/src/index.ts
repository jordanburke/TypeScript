import { ZodSchema } from "zod"

/**
 * This is a workaround for the fact that NestJS Config doesn't support Zod Validation
 */
export const validationOptions = {
  validate: (config: unknown, schema: ZodSchema) => {
    const parsed = schema.safeParse(config)
    if (!parsed.success) {
      return { error: parsed.error, value: undefined }
    } else {
      return { error: undefined, value: parsed.data }
    }
  },
}

/**
 * This is a workaround for the fact that NestJS Config doesn't support Zod Validation
 * @param schema - Zod Schema to validate against
 */
export const validationSchema = (schema: ZodSchema) => {
  return {
    validate: (config: unknown, validationOptions: { validate: (config: unknown, schema: ZodSchema) => any }) => {
      if (!validationOptions) {
        return config
      } else {
        const { error, value } = validationOptions.validate(config, schema)
        if (error) {
          throw error
        } else {
          return value
        }
      }
    },
  }
}