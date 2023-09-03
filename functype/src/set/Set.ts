import { ISet } from "./index"
import { ESSet, IESSet } from "./shim"
import { ICollection } from "../index"

export class Set<T> implements ISet<T>, ICollection<T> {
  private readonly internalSet: IESSet<T>

  constructor(iterable?: Iterable<T>) {
    this.internalSet = new ESSet(iterable)
  }

  add(value: T): Set<T> {
    return new Set([...this.internalSet, value])
  }

  remove(value: T): Set<T> {
    const newSet = new Set<T>()
    return newSet.internalSet.delete(value) ? newSet : this
  }

  contains(value: T): boolean {
    return this.internalSet.has(value)
  }

  get size(): number {
    return this.internalSet.size
  }

  get isEmpty(): boolean {
    return this.internalSet.size === 0
  }

  map<U>(f: (value: T) => U): ISet<U> {
    const newSet = new Set<U>()
    for (const value of this.internalSet) {
      newSet.internalSet.add(f(value))
    }
    return newSet
  }

  flatMap<U>(f: (value: T) => ISet<U>): ISet<U> {
    const newSet = new Set<U>()
    for (const value of this.internalSet) {
      const mapped = f(value)
      if (mapped instanceof Set) {
        for (const newValue of mapped.internalSet) {
          newSet.internalSet.add(newValue)
        }
      }
    }
    return newSet
  }

  reduce<U>(f: (acc: U, value: T) => U): U {
    const values = Array.from(this.internalSet)
    if (values.length === 0) {
      throw new Error("Cannot reduce empty set")
    } else {
      let acc = values[0] as any as U // Assumes that T is assignable to U.
      for (let i = 1; i < values.length; i++) {
        acc = f(acc, values[i])
      }
      return acc
    }
  }

  foldLeft<U>(initialValue: U, f: (acc: U, value: T) => U): U {
    let acc = initialValue
    for (const value of this.internalSet) {
      acc = f(acc, value)
    }
    return acc
  }

  foldRight<U>(initialValue: U, f: (value: T, acc: U) => U): U {
    let acc = initialValue
    const values = Array.from(this.internalSet).reverse()
    for (const value of values) {
      acc = f(value, acc)
    }
    return acc
  }

  has(value: T): boolean {
    return this.internalSet.has(value)
  }
}
