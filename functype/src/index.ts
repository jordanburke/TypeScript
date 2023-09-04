export type SingleType = any

export type ArrayType = SingleType[]

export type Type = SingleType | ArrayType

export const isIterable = <T>(value: any): value is Iterable<T> => {
  return value != null && typeof value[Symbol.iterator] === "function"
}

export interface IAbstractFunctor<A extends Type> {
  map(f: (value: A) => Type): IAbstractFunctor<Type>

  flatMap(f: (value: A) => IAbstractFunctor<Type>): IAbstractFunctor<Type>
}

export interface IFunctor<A extends Type> extends IAbstractFunctor<A> {
  map<B extends Type>(f: (value: A) => B): IFunctor<B>

  flatMap<B extends Type>(f: (value: A) => IFunctor<B>): IFunctor<B>
}

export interface IArrayFunctor<A extends ArrayType> extends IAbstractFunctor<A> {
  map<U extends ArrayType>(f: (value: A) => U): IArrayFunctor<U>

  flatMap<U extends ArrayType>(f: (value: A) => IArrayFunctor<U>): IArrayFunctor<U>
}

export interface ITraversable<T extends Type> extends IFunctor<T> {
  get size(): number

  get isEmpty(): boolean

  contains(value: T): boolean

  reduce<U extends T>(f: (acc: U, value: T) => U): U

  foldLeft<U extends Type>(initialValue: U, f: (acc: U, value: T) => U): U

  foldRight<U extends Type>(initialValue: U, f: (value: T, acc: U) => U): U
}

// export interface ICollection<T extends Type> {
//   add(value: T): ICollection<T>
//
//   remove(value: T): ICollection<T>
// }
