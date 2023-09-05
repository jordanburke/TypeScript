import { IFunctor, Type } from "./functor"

export interface ITraversable<A extends Type> extends IFunctor<A> {
  get size(): number

  get isEmpty(): boolean

  contains(value: A): boolean

  reduce(f: (b: A, a: A) => A): A

  reduceRight(f: (b: A, a: A) => A): A

  foldLeft<B>(z: B): (op: (b: B, a: A) => B) => B

  foldRight<B>(z: B): (op: (a: A, b: B) => B) => B
}

export * from "./functor"
export * from "./iterable"
export * from "./list"
export * from "./map"
export * from "./option"
export * from "./either"
export * from "./set"
export * from "./tuple"
export * from "./try"
