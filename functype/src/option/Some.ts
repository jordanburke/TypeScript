import { Option } from "./index"
import { List } from "../list"
export class Some<T> implements Option<T> {
  constructor(private value: T) {}

  isEmpty(): boolean {
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

  map<U>(f: (value: T) => U): Option<U> {
    return new Some(f(this.value))
  }

  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
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
}
