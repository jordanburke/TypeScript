import { Either } from "./index"
import { Right } from "./Right"

export class Left<L, R> implements Either<L, R> {
  constructor(public value: L) {
  }

  isLeft(): this is Left<L, R> {
    return true
  }

  isRight(): this is Right<L, R> {
    return false
  }

  map<U>(_f: (value: R) => U): Either<L, U> {
    return new Left<L, U>(this.value)
  }

  flatMap<U>(_f: (value: R) => Either<L, U>): Either<L, U> {
    return new Left<L, U>(this.value)
  }

  reduce<U>(_f: (acc: U, value: R) => U): IFunctor<U> {
    return new Left<L, U>(this.value)
  }

  foldLeft<U>(initialValue: U, _f: (acc: U, value: R) => U): U {
    return initialValue
  }

  foldRight<U>(initialValue: U, _f: (value: R, acc: U) => U): U {
    return initialValue
  }
}