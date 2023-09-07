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
 * @param logCallback
 */
export const validationSchema = (
  schema: ZodSchema,
  logCallback?: (status: "none" | "success" | "error", result?: any, error?: any) => void,
) => {
  return {
    validate: (config: unknown, validationOptions: { validate: (config: unknown, schema: ZodSchema) => any }) => {
      if (!validationOptions) {
        logCallback?.("none", config)
        return config
      } else {
        const result = validationOptions.validate(config, schema)
        if (result.error) {
          logCallback?.("error", result, result.error)
          throw result.error
        } else {
          logCallback?.("success", result)
          return result
        }
      }
    },
  }
}
