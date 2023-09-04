import { IFunctor, ITraversable } from "../index"
import { ITuple } from "../tuple"
import { IOption } from "../option"
export { Map } from "./Map"

export interface IMap<K, V> extends IFunctor<ITuple<[K, V]>>, ITraversable<ITuple<[K, V]>> {
  map<U>(f: (value) => U): IMap<K, U>

  flatMap<U>(f: (value) => IMap<K, U>): IMap<K, U>

  reduce<U extends ITuple<[K, V]>>(f: (acc: U, value: ITuple<[K, V]>) => U): U
  foldLeft<U>(initialValue: U, f: (acc: U, value: ITuple<[K, V]>) => U): U
  foldRight<U>(initialValue: U, f: (value: ITuple<[K, V]>, acc: U) => U): U

  get(key: K): IOption<V>

  getOrElse(key: K, defaultValue: V): V

  orElse(key: K, alternative: IOption<V>): IOption<V>
}
