import { Left, Right, Either } from "../either"

export type _Try_<T> = {
  isSuccess(): boolean

  isFailure(): boolean

  getOrElse(defaultValue: T): T

  orElse(alternative: _Try_<T>): _Try_<T>

  toEither(): Either<Error, T>
}
export const Try = <T>(value: T | null, error: Error | null): _Try_<T> => {
  const isSuccess = () => error === null
  const isFailure = () => error !== null
  const getOrElse = (defaultValue: T) => (isSuccess() ? (value as T) : defaultValue)
  const orElse = (alternative: _Try_<T>) => (isSuccess() ? Try(value, error) : alternative)
  const toEither = (): Either<Error, T> =>
    isSuccess() ? new Right<Error, T>(value as T) : new Left<Error, T>(error as Error)

  return {
    isSuccess: isSuccess,
    isFailure: isFailure,
    getOrElse: getOrElse,
    orElse: orElse,
    toEither: toEither,
  }
}

export const $Try = {
  of<T>(f: () => T): _Try_<T> {
    try {
      return Try<T>(f(), null)
    } catch (error) {
      return Try<T>(null, error instanceof Error ? error : new Error(String(error)))
    }
  },
}
