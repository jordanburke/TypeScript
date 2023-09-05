import { ISet } from "../set"
import { IList } from "../list/IList"

export interface IConverters<A> {
  toList(): IList<A>
  toSet(): ISet<A>
}

export interface ICollection<A> extends IConverters<A> {}
