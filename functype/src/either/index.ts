import { Left } from "./Left"
import { Right } from "./Right"
import { List } from "../list/List"
import { IFunctor } from "../functor"
import { IOption } from "../option/IOption"

export interface Either<L, R> extends IFunctor<R> {
  value: L | R

  isLeft(): this is Left<L, R>

  isRight(): this is Right<L, R>

  map<U>(f: (value: R) => U): Either<L, U>

  flatMap<U>(f: (value: R) => Either<L, U>): Either<L, U>

  toOption(): IOption<R>

  toList(): List<R>
}

// Helper functions
export const left = <L, R>(value: L): Either<L, R> => new Left(value)
export const right = <L, R>(value: R): Either<L, R> => new Right(value)

export { Left, Right }
