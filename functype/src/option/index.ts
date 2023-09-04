import { Some } from "./Some"
import { None } from "./None"
import { IFunctor, ITraversable, Type } from "../index"
import { List } from "../list"

export interface IOption<T extends Type> extends IFunctor<T>, ITraversable<T> {
  get(): T

  getOrElse(defaultValue: T): T

  orElse(alternative: IOption<T>): IOption<T>

  map<U extends Type>(f: (value: T) => U): IOption<U>

  flatMap<U extends Type>(f: (value: T) => IOption<U>): IOption<U>

  toList(): List<T>
}

export const option = <T extends Type>(value?: T): IOption<T> => (value ? some(value) : none<T>())
export const some = <T extends Type>(value: T): IOption<T> => new Some(value)
export const none = <T extends Type>(): IOption<T> => new None<T>()

export { Some, None }
