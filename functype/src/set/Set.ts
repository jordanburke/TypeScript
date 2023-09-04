import { ISet } from "./index"
import { ESSet, IESSet } from "./shim"
import { AbstractIterable } from "../iterable/AbstractIterable"

export class Set<T> extends AbstractIterable<T> implements ISet<T> {
  constructor(iterable?: Iterable<T>) {
    super(new ESSet<T>(iterable))
  }

  add(value: T): Set<T> {
    return new Set([...this.values, value])
  }

  remove(value: T): ISet<T> {
    const newSet = new ESSet<T>()
    return newSet.delete(value) ? new Set(newSet) : this
  }

  contains(value: T): boolean {
    return this.has(value)
  }

  has(value: T): boolean {
    return (this.values as IESSet<T>).has(value)
  }
}
