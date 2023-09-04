import { ESMap, IESMap } from "./shim"
import { option, IOption } from "../option"
import { IMap } from "./index"
import { Type } from "../index"
import { ITuple, Tuple } from "../tuple"

export class Map<K, V> implements IMap<K, V> {
  private internalMap: IESMap<K, V>

  constructor(entries: [K, V][] = []) {
    this.internalMap = new ESMap<K, V>(entries)
  }

  add(item: K): Map<K, V> {
    return new Map<K, V>()
  }

  remove(value: ITuple<[K, V]>): Map<K, V> {
    const newMap = new Map<K, V>([...this.internalMap.entries()])
    newMap.internalMap.delete(value[0])
    return newMap
  }

  contains(value: ITuple<[K, V]>): boolean {
    return this.internalMap.get(value[0]) === value[1]
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

  reduce<U extends ITuple<[K, V]>>(f: (acc: U, value: ITuple<[K, V]>) => U): U {
    const values: [K, V][] = Array.from(this.internalMap.entries())
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
    for (const value of this.internalMap.entries()) {
      acc = f(acc, new Tuple(value))
    }
    return acc
  }

  foldRight<U>(initialValue: U, f: (value: ITuple<[K, V]>, acc: U) => U): U {
    let acc = initialValue
    const values = Array.from(this.internalMap.entries()).reverse()
    for (const value of values) {
      acc = f(new Tuple(value), acc)
    }
    return acc
  }

  get(key: K): IOption<V> {
    return option(this.internalMap.get(key))
  }

  getOrElse(key: K, defaultValue: V): V {
    return option(this.internalMap.get(key)).getOrElse(defaultValue)
  }

  get isEmpty(): boolean {
    return this.internalMap.size === 0
  }

  orElse(key: K, alternative: IOption<V>): IOption<V> {
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
