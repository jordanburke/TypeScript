import { ParseError } from "../error/ParseError"
import { Left } from "./Left"
import { Right } from "./Right"

export interface Either<L, R> extends IFunctor<R> {
  value: L | R
  isLeft(): this is Left<L, R>
  isRight(): this is Right<L, R>
  map<U>(f: (value: R) => U): Either<L, U>
  flatMap<U>(f: (value: R) => Either<L, U>): Either<L, U>
}

// Helper functions
export const left = <L, R>(value: L): Either<L, R> => new Left(value)
export const right = <L, R>(value: R): Either<L, R> => new Right(value)

// Usage example:
export const parseNumber = (input: string): Either<ParseError, number> => {
  const result = parseInt(input, 10)
  if (isNaN(result)) {
    return left(new ParseError(`${result}`))
  } else {
    return right(result)
  }
}
