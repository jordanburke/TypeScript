import { IFunctor, ITraversable, Option, Type } from "../index"
import { ITuple } from "../tuple"
export { Map } from "./Map"

export interface IMap<K, V> extends IFunctor<ITuple<[K, V]>>, ITraversable<ITuple<[K, V]>> {
  map<U>(f: (value) => U): IMap<K, U>

  flatMap<U>(f: (value) => IMap<K, U>): IMap<K, U>

  reduce<U extends ITuple<[K, V]>>(f: (acc: U, value: ITuple<[K, V]>) => U): U
  foldLeft<U>(initialValue: U, f: (acc: U, value: ITuple<[K, V]>) => U): U
  foldRight<U>(initialValue: U, f: (value: ITuple<[K, V]>, acc: U) => U): U

  get(key: K): Option<V>

  getOrElse(key: K, defaultValue: V): V

  orElse(key: K, alternative: Option<V>): Option<V>
}
