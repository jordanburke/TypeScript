import { ESMap, IESMap } from "./shim"
import { option, IOption } from "../option"
import { IMap } from "./index"
import { Type } from "../index"
import { ITuple, Tuple } from "../tuple"

export class Map<K, V> implements IMap<K, V> {
  private values: IESMap<K, V>

  constructor(entries?: readonly (readonly [K, V])[] | IterableIterator<[K, V]> | null) {
    this.values = new ESMap<K, V>(entries)
  }

  add(item: ITuple<[K, V]>): Map<K, V> {
    return new Map<K, V>(this.values.set(item[0], item[1]).entries())
  }

  remove(value: ITuple<[K, V]>): Map<K, V> {
    const newMap = new Map<K, V>([...this.values.entries()])
    return newMap.values.delete(value[0]) ? newMap : this
  }

  contains(value: ITuple<[K, V]>): boolean {
    return this.values.get(value[0]) === value[1]
  }

  get size(): number {
    return this.values.size
  }

  map<U>(f: (value: V) => U): IMap<K, U> {
    const newEntries: [K, U][] = []
    for (const [key, value] of this.values.entries()) {
      newEntries.push([key, f(value)])
    }
    return new Map(newEntries)
  }

  flatMap<U>(f: (value: V) => IMap<K, U>): IMap<K, U> {
    const newEntries: [K, U][] = []
    for (const [key, value] of this.values.entries()) {
      const mapped = f(value)
      if (mapped instanceof Map) {
        for (const [newKey, newValue] of mapped.values.entries()) {
          newEntries.push([newKey, newValue])
        }
      }
    }
    return new Map(newEntries)
  }

  reduce<U extends ITuple<[K, V]>>(f: (acc: U, value: ITuple<[K, V]>) => U): U {
    const values: [K, V][] = Array.from(this.values.entries())
    if (values.length === 0) {
      throw new Error("Cannot reduce empty map")
    } else {
      let acc: U = new Tuple<[K, V]>(values[0]) as unknown as U
      for (let i = 1; i < values.length; i++) {
        const value = values[i]
        acc = f(acc, new Tuple<[K, V]>(value))
      }
      return acc
    }
  }

  foldLeft<U>(initialValue: U, f: (acc: U, value: ITuple<[K, V]>) => U): U {
    let acc = initialValue
    for (const value of this.values.entries()) {
      acc = f(acc, new Tuple(value))
    }
    return acc
  }

  foldRight<U>(initialValue: U, f: (value: ITuple<[K, V]>, acc: U) => U): U {
    let acc = initialValue
    const values = Array.from(this.values.entries()).reverse()
    for (const value of values) {
      acc = f(new Tuple(value), acc)
    }
    return acc
  }

  get(key: K): IOption<V> {
    return option(this.values.get(key))
  }

  getOrElse(key: K, defaultValue: V): V {
    return option(this.values.get(key)).getOrElse(defaultValue)
  }

  get isEmpty(): boolean {
    return this.values.size === 0
  }

  orElse(key: K, alternative: IOption<V>): IOption<V> {
    const v = option(this.values.get(key))
    return alternative
  }
}

// Example usage
const myMap = new Map<string, any>([
  ["a", 1],
  ["b", 2],
  ["c", 3],
])
