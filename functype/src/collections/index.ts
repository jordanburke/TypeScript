import { ISet } from "../set"
import { IList } from "../list"

export interface IConverters<A> {
  toList(): IList<A>
  toSet(): ISet<A>
  toString(): string
}

export interface ICollection<A> extends IConverters<A> {}
