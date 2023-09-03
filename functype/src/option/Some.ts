import { Option } from "./index"
import { List } from "../list"
import { ITraversable, Type } from "../index"
export class Some<T extends Type> implements Option<T> {
  constructor(private value: T) {}

  get isEmpty(): boolean {
    return false
  }

  get(): T {
    return this.value
  }

  getOrElse(defaultValue: T): T {
    return this.value
  }

  orElse(alternative: Option<T>): Option<T> {
    return this
  }

  map<U extends Type>(f: (value: T) => U): Option<U> {
    return new Some(f(this.value))
  }

  flatMap<U extends Type>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value)
  }

  reduce<U>(f: (acc: U, value: T) => U): U {
    return f(undefined as any, this.value)
  }

  foldLeft<U>(initialValue: U, f: (acc: U, value: T) => U): U {
    return f(initialValue, this.value)
  }

  foldRight<U>(initialValue: U, f: (value: T, acc: U) => U): U {
    return f(this.value, initialValue)
  }

  toList(): List<T> {
    return new List<T>([this.value])
  }

  contains(value: T): boolean {
    return false
  }

  get size(): number {
    return 0
  }
}
