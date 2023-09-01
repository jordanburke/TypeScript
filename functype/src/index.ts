export interface IFunctor<T> {
  map<U>(f: (value: T) => U): IFunctor<U>
  flatMap<U>(f: (value: T) => IFunctor<U>): IFunctor<U>
}
export interface ITraversable<T> {
  isEmpty(): boolean
  reduce<U>(f: (acc: U, value: T) => U): U
  foldLeft<U>(initialValue: U, f: (acc: U, value: T) => U): U
  foldRight<U>(initialValue: U, f: (value: T, acc: U) => U): U
}

export * from "./either/index"
export * from "./list/index"
export * from "./option/index"
