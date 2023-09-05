import { IFunctor, Type } from "../functor"
import { ITraversable } from "../index"
import { IIterable } from "../iterable"
import { Seq } from "../iterable/Seq"

export interface Option<T extends Type> extends IFunctor<T>, ITraversable<T> {
  get(): T

  getOrElse(defaultValue: T): T

  orElse(alternative: Option<T>): Option<T>

  map<U extends Type>(f: (value: T) => U): Option<U>

  flatMap<U extends Type>(f: (value: T) => Option<U>): Option<U>

  toList(): IIterable<T>
}

export class Some<A extends Type> implements Option<A> {
  constructor(private value: A) {}

  get isEmpty(): boolean {
    return false
  }

  get(): A {
    return this.value
  }

  getOrElse(defaultValue: A): A {
    return this.value
  }

  orElse(alternative: Option<A>): Option<A> {
    return this
  }

  map<U extends Type>(f: (value: A) => U): Option<U> {
    return new Some(f(this.value))
  }

  flatMap<U extends Type>(f: (value: A) => Option<U>): Option<U> {
    return f(this.value)
  }

  reduce<U>(f: (acc: U, value: A) => U): U {
    return f(undefined as any, this.value)
  }

  reduceRight<U>(f: (acc: U, value: A) => U): U {
    return f(undefined as any, this.value)
  }

  foldLeft<B>(z: B): (op: (b: B, a: A) => B) => B {
    return (f: (b: B, a: A) => B) => {
      return f(z, this.value)
    }
  }

  foldRight<B>(z: B): (op: (a: A, b: B) => B) => B {
    return (f: (a: A, b: B) => B) => {
      return f(this.value, z)
    }
  }

  toList(): IIterable<A> {
    return new Seq<A>([this.value])
  }

  contains(value: A): boolean {
    return false
  }

  get size(): number {
    return 0
  }
}

export class None<A extends Type> implements Option<A> {
  get isEmpty(): boolean {
    return true
  }

  get(): A {
    throw new Error("Cannot call get() on a None")
  }

  getOrElse(defaultValue: A): A {
    return defaultValue
  }

  orElse(alternative: Option<A>): Option<A> {
    return alternative
  }

  map<U extends Type>(f: (value: A) => U): Option<U> {
    return new None<U>()
  }

  flatMap<U extends Type>(f: (value: A) => Option<U>): Option<U> {
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
