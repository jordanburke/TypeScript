import { Either } from "./index"
import { Right } from "./Right"

export class Left<L, R> {
  readonly tag = "Left"

  constructor(public value: L) {}

  isLeft(): this is Left<L, R> {
    return true
  }

  isRight(): this is Right<L, R> {
    return false
  }

  // Transform only the Right value
  // eslint-disable-line @typescript-eslint/no-unused-vars
  map<U>(f: (value: R) => U): Either<L, U> {
    return new Left(this.value)
  }

  // Chain functions that return an Either
  flatMap<U>(f: (value: R) => Either<L, U>): Either<L, U> {
    // eslint-disable-line @typescript-eslint/no-unused-vars
    return new Left(this.value)
  }
}
