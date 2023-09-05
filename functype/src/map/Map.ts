import { ESMap, IESMap } from "./shim"
import { ITuple, Tuple } from "../tuple"
import { Seq } from "../iterable/Seq"
import { ISet } from "../set"
import { Set } from "../set"
import { Option, option } from "../option"
import { IList, List } from "../list"
import { ITraversable } from "../index"
import { ICollection } from "../collections"

export interface IMap<K, V> extends ITraversable<ITuple<[K, V]>>, ICollection<ITuple<[K, V]>> {
  map<U>(f: (value) => U): IMap<K, U>

  flatMap<U>(f: (value) => IMap<K, U>): IMap<K, U>

  get(key: K): Option<V>

  getOrElse(key: K, defaultValue: V): V

  orElse(key: K, alternative: Option<V>): Option<V>
}

export class Map<K, V> implements IMap<K, V> {
  private values: IESMap<K, V>

  private get entries() {
    return Array.from(this.values.entries()).map(([key, value]) => new Tuple<[K, V]>([key, value]))
  }

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

  reduce(f: (acc: Tuple<[K, V]>, value: Tuple<[K, V]>) => Tuple<[K, V]>): Tuple<[K, V]> {
    return new Seq(this.entries).reduce(f)
  }

  reduceRight(f: (acc: Tuple<[K, V]>, value: Tuple<[K, V]>) => Tuple<[K, V]>): Tuple<[K, V]> {
    return new Seq(this.entries).reduceRight(f)
  }

  foldLeft<B>(z: B): (op: (b: B, a: ITuple<[K, V]>) => B) => B {
    const iterables = new Seq(this.entries)
    return (f: (b: B, a: ITuple<[K, V]>) => B) => {
      return iterables.foldLeft(z)(f)
    }
  }

  foldRight<B>(z: B): (op: (a: ITuple<[K, V]>, b: B) => B) => B {
    const iterables = new Seq(this.entries)
    return (f: (a: ITuple<[K, V]>, b: B) => B) => {
      return iterables.foldRight(z)(f)
    }
  }

  get(key: K): Option<V> {
    return option(this.values.get(key))
  }

  getOrElse(key: K, defaultValue: V): V {
    return option(this.values.get(key)).getOrElse(defaultValue)
  }

  get isEmpty(): boolean {
    return this.values.size === 0
  }

  orElse(key: K, alternative: Option<V>): Option<V> {
    const v = option(this.values.get(key))
    return alternative
  }

  toList(): IList<Tuple<[K, V]>> {
    return new List(this.entries)
  }

  toSet(): ISet<Tuple<[K, V]>> {
    return new Set(this.entries)
  }
}

// Example usage
const myMap = new Map<string, any>([
  ["a", 1],
  ["b", 2],
  ["c", 3],
])
