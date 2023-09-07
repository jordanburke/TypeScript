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

Example with Logging Callback:
```typescript
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema: validationSchema(ConfigSchema, (status: string, _result: unknown, error: ZodError<unknown>) => {
        if (status === "error") {
          log.error(`Error validating config: ${error.errors.flatMap((value) => value.path).join(", ")}`, error)
        }
      }),
      validationOptions: validationOptions,
    })
```

Yields:
```typescript
[App] Error 2023-09-07T23:38:06.603Z Error validating config: VAR1, VAR2 - {
  stack: [
    {
      issues: [
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: [ 'VAR1' ],
          message: 'Required'
        },
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: [ 'VAR2' ],
          message: 'Required'
        }
      ],
      name: 'ZodError'
    }
  ]
}
```