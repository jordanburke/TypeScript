import { option } from "../option"
import { IIterable } from "../iterable"
import { Seq } from "../iterable"
import { ICollection } from "../collections"
import { Set } from "../set"
import { Option } from "../option"

export interface IList<T> extends IIterable<T>, ArrayLike<T> {
  add(item: T): IList<T>
}

export class List<A> extends Seq<A> implements IList<A>, ICollection<A> {
  constructor(values?: Iterable<A> | IIterable<A>) {
    super(values)
  }

  readonly [n: number]: A

  map<B>(f: (a: A) => B): List<B> {
    return new List(super.map(f))
  }

  flatMap<B>(f: (a: A) => IIterable<B>): List<B> {
    return new List(super.flatMap(f))
  }

  remove(value: A): List<A> {
    const newList = new List<A>()
    const index = newList.toArray().indexOf(value)
    return this.removeAt(index)
  }

  contains(value: A): boolean {
    return this.toArray().indexOf(value) !== -1
  }

  add(item: A): List<A> {
    const temp = this.toArray()
    const values = [...temp, item]
    return new List(values)
  }

  // Remove the item from the list by index and return a new list
  removeAt(index: number): List<A> {
    if (index < 0 || index >= this.toArray().length) {
      return this // return the same list if index is out of bounds
    }
    const newItems = [...this.toArray().slice(0, index), ...this.toArray().slice(index + 1)]
    return new List(newItems)
  }

  // Retrieve an item by index
  get(index: number): Option<A> {
    return option(this.toArray()[index])
  }

  concat(other: List<A>): List<A> {
    return new List([...this.toArray(), ...other.toArray()])
  }

  toList(): IList<A> {
    return this
  }

  toSet(): Set<A> {
    return new Set(this.toArray())
  }

  toString(): string {
    return `List(${this.toArray().toString()})`
  }
}
