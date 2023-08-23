## nestjs-config-zod-validation

A simple Zod Validation shim for NestJS ConfigService

``` typescript
import { validationSchema, validationOptions } from "nestjs-config-zod-validation"

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: validationSchema(ConfigSchema), // Pass in your ZodSchema "Schema" here
      validationOptions: validationOptions,
    }),
  ],
})
```

Then upon start up you will get any validation errors if any, for example:
```typescript
ZodError: [
  {
    "code": "invalid_type",
    "expected": "string",
    "received": "undefined",
    "path": [
      "SOME_ZOD_VARIABLE",
    ],
    "message": "Required"
  }
]
```