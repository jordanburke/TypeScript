export interface IFunctor<T> {
  map<U>(f: (value: T) => U): IFunctor<U>
  flatMap<U>(f: (value: T) => IFunctor<U>): IFunctor<U>
}
export interface ITraversable<T> {
  get size(): number
  get isEmpty(): boolean
  contains(value: T): boolean
  reduce<U>(f: (acc: U, value: T) => U): U
  foldLeft<U>(initialValue: U, f: (acc: U, value: T) => U): U
  foldRight<U>(initialValue: U, f: (value: T, acc: U) => U): U
}

export interface ICollection<T> extends ITraversable<T> {
  add(value: T): ITraversable<T>
  remove(value: T): ITraversable<T>
}

export * from "./either/index"
export * from "./list/index"
export * from "./map/index"
export * from "./option/index"
export * from "./set/index"
