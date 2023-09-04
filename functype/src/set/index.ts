import { Set } from "./Set"
import { IIterable } from "../iterable"

export interface ISet<T> extends IIterable<T> {
  has(value: T): boolean
}

export { Set }
