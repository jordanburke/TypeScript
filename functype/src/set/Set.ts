import { ESSet, IESSet } from "./shim"
import { IIterable, Seq } from "../iterable"
import { IList, List } from "../list"
import { ICollection } from "../collections"
import { isIterable } from "../util/isIterable"

export interface ISet<T> extends IIterable<T>, ICollection<T> {
  has(value: T): boolean
}

export class Set<A> extends Seq<A> implements ISet<A> {
  constructor(iterable?: Iterable<A> | IIterable<A>) {
    if (isIterable(iterable)) {
      super(new ESSet<A>(iterable))
    } else {
      super(iterable?.toArray())
    }
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
    return new Set(super.map(f))
  }

  flatMap<B>(f: (a: A) => IIterable<B>): Set<B> {
    return new Set(super.flatMap(f))
  }

  toList(): IList<A> {
    return new List(this)
  }

  toSet(): ISet<A> {
    return this
  }

  toString(): string {
    return `Set(${this.toArray().toString()})`
  }
}
