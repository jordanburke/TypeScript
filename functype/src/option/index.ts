import { IFunctor, List } from "../index"
import { Some } from "./Some"
import { None } from "./None"

export interface Option<T> extends IFunctor<T> {
  isEmpty(): boolean
  get(): T
  getOrElse(defaultValue: T): T
  orElse(alternative: Option<T>): Option<T>
  map<U>(f: (value: T) => U): Option<U>
  flatMap<U>(f: (value: T) => Option<U>): Option<U>
  toList(): List<T>
}

export const option = <T>(value?: T): Option<T> => (value ? some(value) : none<T>())
export const some = <T>(value: T): Option<T> => new Some(value)
export const none = <T>(): Option<T> => new None<T>()

export { Some, None }
