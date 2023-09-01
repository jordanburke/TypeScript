import { List } from "./List"
import { IFunctor, ITraversable } from "../index"

export interface IList<T> extends IFunctor<T>, ITraversable<T>, ArrayLike<T> {
  map<U>(f: (value: T) => U): IList<U>
  flatMap<U>(f: (value: T) => IList<U>): IList<U>
  reduce<U>(f: (acc: U, value: T) => U): U
  foldLeft<U>(initialValue: U, f: (acc: U, value: T) => U): U
  foldRight<U>(initialValue: U, f: (value: T, acc: U) => U): U
}

const list = <T>(items: T[] | undefined) => new List<T>(items)

export { list, List }
