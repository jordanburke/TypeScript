import { IList } from "./index"
import { IOption, option } from "../option"
import { IIterable } from "../iterable"
import { AbstractIterable } from "../iterable/AbstractIterable"
import { Set } from "../set"

export class List<T> extends AbstractIterable<T> implements IList<T> {
  constructor(values?: Iterable<T> | IIterable<T>) {
    super(values)
  }

  readonly [n: number]: T

  remove(value: T): List<T> {
    const newList = new List<T>()
    const index = newList.toArray().indexOf(value)
    return this.removeAt(index)
  }

  contains(value: T): boolean {
    return this.toArray().indexOf(value) !== -1
  }

  add(item: T): List<T> {
    const temp = this.toArray()
    const values = [...temp, item]
    return new List(values)
  }

  // Remove the item from the list by index and return a new list
  removeAt(index: number): List<T> {
    if (index < 0 || index >= this.toArray().length) {
      return this // return the same list if index is out of bounds
    }
    const newItems = [...this.toArray().slice(0, index), ...this.toArray().slice(index + 1)]
    return new List(newItems)
  }

  // Retrieve an item by index
  get(index: number): IOption<T> {
    return option(this.toArray()[index])
  }

  concat(other: List<T>): List<T> {
    return new List([...this.toArray(), ...other.toArray()])
  }

  toSet(): Set<T> {
    return new Set(this.toArray())
  }

  toString(): string {
    return `List(${this.toArray().toString()})`
  }
}
