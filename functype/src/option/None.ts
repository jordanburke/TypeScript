import { List } from "../list/List"

import { Type } from "../functor"
import { IOption } from "./IOption"
import { Seq } from "../iterable/Seq"
import { IIterable } from "../iterable"

export class None<A extends Type> implements IOption<A> {
  get isEmpty(): boolean {
    return true
  }

  get(): A {
    throw new Error("Cannot call get() on a None")
  }

  getOrElse(defaultValue: A): A {
    return defaultValue
  }

  orElse(alternative: IOption<A>): IOption<A> {
    return alternative
  }

  map<U extends Type>(f: (value: A) => U): IOption<U> {
    return new None<U>()
  }

  flatMap<U extends Type>(f: (value: A) => IOption<U>): IOption<U> {
    return new None<U>()
  }

  reduce(f: (acc: A, value: A) => A): A {
    return f(undefined as any, undefined as any)
  }

  reduceRight(f: (b: A, a: A) => A): A {
    return f(undefined as any, undefined as any)
  }

  foldLeft<B>(z: B): (op: (b: B, a: A) => B) => B {
    return (f: (b: B, a: A) => B) => {
      return z
    }
  }

  foldRight<B>(z: B): (op: (a: A, b: B) => B) => B {
    return (f: (a: A, b: B) => B) => {
      return z
    }
  }

  toList(): IIterable<A> {
    return new Seq<A>()
  }

  contains(value: A): boolean {
    return false
  }

  get size(): number {
    return 0
  }
}
