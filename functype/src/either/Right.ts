import { Either, Left } from "./index"
import { IOption, some } from "../option"
import { List } from "../list"

export class Right<L, R> implements Either<L, R> {
  constructor(public value: R) {}

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

  toOption(): IOption<R> {
    return some<R>(this.value)
  }

  toList(): List<R> {
    return new List<R>([this.value])
  }
}
