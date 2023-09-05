import { Either, Left, Right } from "../either"

interface ITry<T> {
  isSuccess(): boolean

  isFailure(): boolean

  getOrElse(defaultValue: T): T

  orElse(alternative: ITry<T>): ITry<T>

  toEither(): Either<Error, T>
}

export class Try<T> implements ITry<T> {
  private readonly value: T | null
  private readonly error: Error | null

  private constructor(value: T | null, error: Error | null) {
    this.value = value
    this.error = error
  }

  static of<T>(f: () => T): Try<T> {
    try {
      return new Try<T>(f(), null)
    } catch (error) {
      return new Try<T>(null, error instanceof Error ? error : new Error(String(error)))
    }
  }

  isSuccess(): boolean {
    return this.error === null
  }

  isFailure(): boolean {
    return this.error !== null
  }

  getOrElse(defaultValue: T): T {
    return this.isSuccess() ? (this.value as T) : defaultValue
  }

  orElse(alternative: ITry<T>): ITry<T> {
    return this.isSuccess() ? this : alternative
  }

  toEither(): Either<Error, T> {
    return this.isSuccess() ? new Right(this.value as T) : new Left(this.error as Error)
  }
}
