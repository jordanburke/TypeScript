import { IFunctor, Type } from "../functor"
import { ITraversable } from "../index"
import { IIterable } from "../iterable"

export interface IOption<T extends Type> extends IFunctor<T>, ITraversable<T> {
  get(): T

  getOrElse(defaultValue: T): T

  orElse(alternative: IOption<T>): IOption<T>

  map<U extends Type>(f: (value: T) => U): IOption<U>

  flatMap<U extends Type>(f: (value: T) => IOption<U>): IOption<U>

  toList(): IIterable<T>
}
