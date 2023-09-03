import { Option } from "./index"
import { List } from "../list"
import { Type } from "../index"

export class None<T extends Type> implements Option<T> {
  get isEmpty(): boolean {
    return true
  }

  get(): T {
    throw new Error("Cannot call get() on a None")
  }

  getOrElse(defaultValue: T): T {
    return defaultValue
  }

  orElse(alternative: Option<T>): Option<T> {
    return alternative
  }

  map<U extends Type>(f: (value: T) => U): Option<U> {
    return new None<U>()
  }

  flatMap<U extends Type>(f: (value: T) => Option<U>): Option<U> {
    return new None<U>()
  }

  reduce<U>(f: (acc: U, value: T) => U): U {
    return f(undefined as any, undefined as any)
  }

  foldLeft<U>(initialValue: U, f: (acc: U, value: T) => U): U {
    return initialValue
  }

  foldRight<U>(initialValue: U, f: (value: T, acc: U) => U): U {
    return initialValue
  }

  toList(): List<T> {
    return new List<T>()
  }

  contains(value: T): boolean {
    return false
  }

  get size(): number {
    return 0
  }
}
