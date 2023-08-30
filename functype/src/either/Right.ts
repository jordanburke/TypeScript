import { Either } from "./index"
import { Left } from "./Left"

export class Right<L, R> implements Either<L, R> {
  constructor(public value: R) {
  }

  isLeft(): this is Left<L, R> {
    return false
  }

  isRight(): this is Right<L, R> {
    return true
  }

  map<U>(f: (value: R) => U): Either<L, U> {
    return new Right<L, U>(f(this.value))
  }

  flatMap<U>(f: (value: R) => Either<L, U>): Either<L, U> {
    return f(this.value)
  }

  reduce<U>(f: (acc: U, value: R) => U): IFunctor<U> {
    return new Right<L, U>(f(undefined as any, this.value))
  }

  foldLeft<U>(initialValue: U, f: (acc: U, value: R) => U): U {
    return f(initialValue, this.value)
  }

  foldRight<U>(initialValue: U, f: (value: R, acc: U) => U): U {
    return f(this.value, initialValue)
  }
}