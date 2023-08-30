export interface IFunctor<T> {
  map<U>(f: (value: T) => U): IFunctor<U>;
  flatMap<U>(f: (value: T) => IFunctor<U>): IFunctor<U>;
  reduce<U>(f: (acc: U, value: T) => U): IFunctor<U>;
  foldLeft<U>(initialValue: U, f: (acc: U, value: T) => U): U;
  foldRight<U>(initialValue: U, f: (value: T, acc: U) => U): U;
}

export * from "./either"
export * from "./either/Right"
export * from "./either/Left"
export * from "./list/List"
