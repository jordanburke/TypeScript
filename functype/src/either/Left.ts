import { Either, Right } from "./index"
import { IOption, none } from "../option"
import { List } from "../list"

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

  toOption(): IOption<R> {
    return none<R>()
  }

  toList(): List<R> {
    return new List()
  }
}
