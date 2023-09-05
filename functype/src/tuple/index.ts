import { ArrayType, IArrayFunctor } from "../functor"

export { Tuple } from "./Tuple"

export interface ITuple<T extends ArrayType> extends IArrayFunctor<T> {
  get(index: number): T[number]

  getAs<U>(index: number, f?: (item: T) => boolean): U

  map<U extends any[]>(f: (value: T) => U): ITuple<U>

  flatMap<U extends any[]>(f: (value: T) => ITuple<U>): ITuple<U>
}
