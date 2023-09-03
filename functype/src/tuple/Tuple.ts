import { ArrayType, IFunctor } from "../index"
import { ITuple } from "./index"

export class Tuple<T extends ArrayType> implements Tuple<T> {
  constructor(private values: T) {}

  map<U extends ArrayType>(f: (value: T) => U): Tuple<U> {
    const mapValue = f(this.values)
    return new Tuple(mapValue)
  }

  flatMap<U extends ArrayType>(f: (value: T) => Tuple<U>): Tuple<U> {
    return f(this.values)
  }

  // Additional Tuple methods
  get(index: number): T[number] {
    return this.values[index]
  }

  toArray(): T {
    return this.values
  }
}
