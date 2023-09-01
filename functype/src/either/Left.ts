import { Either, Right } from "./index"
import { IFunctor, List, none, Option } from "../index"

export class Left<L, R> implements Either<L, R> {
  constructor(public value: L) {}

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

  toOption(): Option<R> {
    return none<R>()
  }

  toList(): List<R> {
    return new List()
  }
}
