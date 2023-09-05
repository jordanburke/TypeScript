import { ITraversable } from "../index"
import { ITuple } from "../tuple"
import { ICollection } from "../collections"
import { IOption } from "../option/IOption"

export { Map } from "./Map"

export interface IMap<K, V> extends ITraversable<ITuple<[K, V]>>, ICollection<ITuple<[K, V]>> {
  map<U>(f: (value) => U): IMap<K, U>

  flatMap<U>(f: (value) => IMap<K, U>): IMap<K, U>

  get(key: K): IOption<V>

  getOrElse(key: K, defaultValue: V): V

  orElse(key: K, alternative: IOption<V>): IOption<V>
}
