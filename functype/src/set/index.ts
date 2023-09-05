import { IIterable } from "../iterable"
import { ICollection } from "../collections"

export interface ISet<T> extends IIterable<T>, ICollection<T> {
  has(value: T): boolean
}
