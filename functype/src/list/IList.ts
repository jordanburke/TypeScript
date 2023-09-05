import { IIterable } from "../iterable"

export interface IList<T> extends IIterable<T>, ArrayLike<T> {
  add(item: T): IList<T>
}