import { ITuple } from "./index"
import { ArrayType } from "../functor"

export class Tuple<T extends ArrayType> implements ITuple<T> {
  constructor(private readonly values: T) {}

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

  getAs<U>(index: number, f?: (item: T) => boolean): U {
    const value = this.values[index]
    if (f) {
      if (f(this.values)) {
        return value as any as U
      } else {
        throw new Error("Cannot cast tuple value")
      }
    } else {
      return value as any as U
    }
  }

  toArray(): T {
    return this.values
  }
}
