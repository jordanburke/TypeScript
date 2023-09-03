import { IFunctor, ITraversable, List, SingleType, Type } from "../index"
import { Some } from "./Some"
import { None } from "./None"

export interface Option<T extends Type> extends IFunctor<T>, ITraversable<T> {
  get(): T
  getOrElse(defaultValue: T): T
  orElse(alternative: Option<T>): Option<T>
  map<U extends Type>(f: (value: T) => U): Option<U>
  flatMap<U extends Type>(f: (value: T) => Option<U>): Option<U>
  toList(): List<T>
}

export const option = <T extends Type>(value?: T): Option<T> => (value ? some(value) : none<T>())
export const some = <T extends Type>(value: T): Option<T> => new Some(value)
export const none = <T extends Type>(): Option<T> => new None<T>()

export { Some, None }
