import { ArrayType, IArrayFunctor } from "../index"
export { Tuple } from "./Tuple"

export interface ITuple<T extends ArrayType> extends IArrayFunctor<T> {
  // Retrieve a value by index
  // get(index: number): T[number]
  // // Map
  // map<U extends any[]>(f: (value: T) => U): ITuple<U>
  //
  // // FlatMap
  // flatMap<U extends any[]>(f: (value: T) => ITuple<U>): ITuple<U>
}
