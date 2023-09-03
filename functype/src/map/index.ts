import { IFunctor, Option, Type } from "../index"
import { ITuple } from "../tuple"
export { Map } from "./Map"

export interface IMap<K extends Type, V extends Type> extends IFunctor<ITuple<[K, V]>> {
  map<U>(f: (value) => U): IMap<K, U>

  flatMap<U>(f: (value) => IMap<K, U>): IMap<K, U>

  get(key: K): Option<V>

  getOrElse(key: K, defaultValue: V): V

  orElse(key: K, alternative: Option<V>): Option<V>
}
