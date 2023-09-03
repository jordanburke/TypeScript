import { IFunctor, ITraversable, Option } from "../index"
import { Map } from "./Map"

export interface IMap<K, T> extends IFunctor<T> {
  map<U>(f: (value: T) => U): IMap<K, U>

  flatMap<U>(f: (value: T) => IMap<K, U>): IMap<K, U>

  get(key: K): Option<T>

  getOrElse(key: K, defaultValue: T): T

  orElse(key: K, alternative: Option<T>): Option<T>
}

export { Map }
