import { List } from "./List"
import { Type } from "../index"
import { Set } from "../set"
import { IIterable } from "../iterable"

export interface IList<T extends Type> extends IIterable<T>, ArrayLike<T> {
  add(item: T): IList<T>

  toSet(): Set<T>
}

const list = <T extends Type>(items: T[] | undefined) => new List<T>(items)

export { list, List }
