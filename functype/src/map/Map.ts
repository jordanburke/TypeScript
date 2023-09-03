import { ESMap, IESMap } from "./shim"
import { option, Option } from "../option"
import { IMap } from "./index"
import { Type } from "../index"

export class Map<K, V> implements IMap<K, V> {
  private internalMap: IESMap<K, V>

  constructor(entries: [K, V][] = []) {
    this.internalMap = new ESMap<K, V>(entries)
  }

  add(item: K): IMap<K, V> {
    return new Map<K, V>()
  }

  remove(value: K): IMap<K, V> {
    const newMap = new Map<K, V>([...this.internalMap.entries()])
    newMap.internalMap.delete(value)
    return newMap
  }

  contains(value: K): boolean {
    return this.internalMap.has(value)
  }

  get size(): number {
    return this.internalMap.size
  }

  map<U extends Type>(f: (value: V) => U): IMap<K, U> {
    const newEntries: [K, U][] = []
    for (const [key, value] of this.internalMap.entries()) {
      newEntries.push([key, f(value)])
    }
    return new Map(newEntries)
  }

  flatMap<U extends Type>(f: (value: V) => IMap<K, U>): IMap<K, U> {
    const newEntries: [K, U][] = []
    for (const [key, value] of this.internalMap.entries()) {
      const mapped = f(value)
      if (mapped instanceof Map) {
        for (const [newKey, newValue] of mapped.internalMap.entries()) {
          newEntries.push([newKey, newValue])
        }
      }
    }
    return new Map(newEntries)
  }

  reduce<U>(f: (acc: U, value: V) => U): U {
    const values = Array.from(this.internalMap.values())
    if (values.length === 0) {
      throw new Error("Cannot reduce empty map")
    } else {
      let acc = values[0] as any as U // Assumes that V is assignable to U.
      for (let i = 1; i < values.length; i++) {
        acc = f(acc, values[i])
      }
      return acc
    }
  }

  foldLeft<U>(initialValue: U, f: (acc: U, value: V) => U): U {
    let acc = initialValue
    for (const value of this.internalMap.values()) {
      acc = f(acc, value)
    }
    return acc
  }

  foldRight<U>(initialValue: U, f: (value: V, acc: U) => U): U {
    let acc = initialValue
    const values = Array.from(this.internalMap.values()).reverse()
    for (const value of values) {
      acc = f(value, acc)
    }
    return acc
  }

  get(key: K): Option<V> {
    return option(this.internalMap.get(key))
  }

  getOrElse(key: K, defaultValue: V): V {
    return option(this.internalMap.get(key)).getOrElse(defaultValue)
  }

  get isEmpty(): boolean {
    return this.internalMap.size === 0
  }

  orElse(key: K, alternative: Option<V>): Option<V> {
    const v = option(this.internalMap.get(key))
    return alternative
  }
}

// Example usage
const myMap = new Map<string, any>([
  ["a", 1],
  ["b", 2],
  ["c", 3],
])
