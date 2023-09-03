import { List } from "./List"
import { ICollection, IFunctor, Type } from "../index"

export interface IList<T extends Type> extends IFunctor<T>, ICollection<T>, ArrayLike<T> {
  map<U extends Type>(f: (value: T) => U): IList<U>

  flatMap<U extends Type>(f: (value: T) => IList<U>): IList<U>

  reduce<U extends Type>(f: (acc: U, value: T) => U): U

  foldLeft<U extends Type>(initialValue: U, f: (acc: U, value: T) => U): U

  foldRight<U extends Type>(initialValue: U, f: (value: T, acc: U) => U): U
}

const list = <T extends Type>(items: T[] | undefined) => new List<T>(items)

export { list, List }
