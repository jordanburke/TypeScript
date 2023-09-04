import { IList } from "./index"
import { IOption, option } from "../option"
import { IIterable } from "../iterable"
import { AbstractIterable } from "../iterable/AbstractIterable"
import { ISet, Set } from "../set"

export class List<A> extends AbstractIterable<A> implements IList<A> {
  constructor(values?: Iterable<A> | IIterable<A>) {
    super(values)
  }

  readonly [n: number]: A

  map<B>(f: (a: A) => B): List<B> {
    return new List(super.map(f).toArray())
  }

  flatMap<B>(f: (a: A) => IIterable<B>): List<B> {
    return new List(super.flatMap(f).toArray())
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
  get(index: number): IOption<A> {
    return option(this.toArray()[index])
  }

  concat(other: List<A>): List<A> {
    return new List([...this.toArray(), ...other.toArray()])
  }

  toSet(): Set<A> {
    return new Set(this.toArray())
  }

  toString(): string {
    return `List(${this.toArray().toString()})`
  }
}
