import { IFunctor } from "../index"
import { Set } from "./Set"

export interface ISet<T> extends IFunctor<T> {
  map<U>(f: (value: T) => U): ISet<U>
  flatMap<U>(f: (value: T) => ISet<U>): ISet<U>
  reduce<U>(f: (acc: U, value: T) => U): U
  foldLeft<U>(initialValue: U, f: (acc: U, value: T) => U): U
  foldRight<U>(initialValue: U, f: (value: T, acc: U) => U): U
  has(value: T): boolean
}

export { Set }
