import { Type } from "../functor"
import { IOption } from "./IOption"
import { IIterable } from "../iterable"
import { Seq } from "../iterable/Seq"

export class Some<A extends Type> implements IOption<A> {
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

  orElse(alternative: IOption<A>): IOption<A> {
    return this
  }

  map<U extends Type>(f: (value: A) => U): IOption<U> {
    return new Some(f(this.value))
  }

  flatMap<U extends Type>(f: (value: A) => IOption<U>): IOption<U> {
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
