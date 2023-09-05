import { ISet } from "./index"
import { ESSet, IESSet } from "./shim"
import { Seq } from "../iterable/Seq"
import { IIterable } from "../iterable"
import { List } from "../list/List"
import { IList } from "../list/IList"

export class Set<A> extends Seq<A> implements ISet<A> {
  constructor(iterable?: Iterable<A>) {
    super(new ESSet<A>(iterable))
  }

  add(value: A): Set<A> {
    return new Set([...this.values, value])
  }

  remove(value: A): Set<A> {
    const newSet = new ESSet<A>()
    return newSet.delete(value) ? new Set(newSet) : this
  }

  contains(value: A): boolean {
    return this.has(value)
  }

  has(value: A): boolean {
    return (this.values as IESSet<A>).has(value)
  }

  map<B>(f: (a: A) => B): Set<B> {
    return new Set(super.map(f).toArray())
  }

  flatMap<B>(f: (a: A) => IIterable<B>): Set<B> {
    return new Set(super.flatMap(f).toArray())
  }

  toList(): IList<A> {
    return new List(this.toArray())
  }

  toSet(): ISet<A> {
    return this
  }
}
