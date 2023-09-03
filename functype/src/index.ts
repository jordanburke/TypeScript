export type SingleType = any

export type ArrayType = SingleType[]

export type Type = SingleType | ArrayType

export interface AbstractFunctor<T extends Type> {
  map(f: (value: T) => Type): AbstractFunctor<Type>
  flatMap(f: (value: T) => AbstractFunctor<Type>): AbstractFunctor<Type>
}

export interface IFunctor<T extends Type> extends AbstractFunctor<T> {
  map<U extends Type>(f: (value: T) => U): IFunctor<U>
  flatMap<U extends Type>(f: (value: T) => IFunctor<U>): IFunctor<U>
}

export interface IArrayFunctor<T extends ArrayType> extends AbstractFunctor<T> {
  map<U extends ArrayType>(f: (value: T) => U): IArrayFunctor<U>
  flatMap<U extends ArrayType>(f: (value: T) => IArrayFunctor<U>): IArrayFunctor<U>
}

export interface ITraversable<T extends Type> extends IFunctor<T> {
  get size(): number
  get isEmpty(): boolean
  contains(value: T): boolean
  reduce<U extends Type>(f: (acc: U, value: T) => U): U
  foldLeft<U extends Type>(initialValue: U, f: (acc: U, value: T) => U): U
  foldRight<U extends Type>(initialValue: U, f: (value: T, acc: U) => U): U
}

export interface ICollection<T extends Type> extends ITraversable<T> {
  add(value: T): ITraversable<T>
  remove(value: T): ITraversable<T>
}

export * from "./either/index"
export * from "./list/index"
export * from "./map/index"
export * from "./option/index"
export * from "./set/index"
