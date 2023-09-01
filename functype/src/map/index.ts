import { IFunctor, ITraversable } from "../index"

export interface IMap<K, T> extends IFunctor<T>, ITraversable<T> {
  map<U>(f: (value: T) => U): IMap<K, U>
  flatMap<U>(f: (value: T) => IMap<K, U>): IMap<K, U>
}
