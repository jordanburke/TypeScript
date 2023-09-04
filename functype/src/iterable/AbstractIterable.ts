import { IOption, none, option } from "../option"
import { isIterable, Type } from "../index"
import { IIterable } from "./index"

export class AbstractIterable<A> implements IIterable<A> {
  protected readonly values: Iterable<A>
  constructor(values?: Iterable<A> | IIterable<A>) {
    if (isIterable(values)) {
      this.values = values
    } else if (values instanceof AbstractIterable) {
      this.values = values.toArray()
    } else if (!values) {
      this.values = []
    }
  }

  readonly [n: number]: A

  get length(): number {
    return this.toArray().length
  }

  map<B>(f: (a: A) => B): IIterable<B> {
    return new AbstractIterable(this.toArray().map(f))
  }

  flatMap<B>(f: (a: A) => IIterable<B>): IIterable<B> {
    const tempArray: B[] = []
    for (const item of this.values) {
      const mappedList = f(item)
      if (mappedList instanceof AbstractIterable) {
        tempArray.push(...mappedList.values)
      }
    }
    return new AbstractIterable(tempArray)
  }

  forEach(f: (a: A) => void) {
    this.toArray().forEach(f)
  }

  count(p: (x: A) => boolean): number {
    return 0
  }

  // drop(n: number): IIterable<A> {
  //   return undefined
  // }
  //
  // dropRight(n: number): IIterable<A> {
  //   return undefined
  // }
  //
  // dropWhile(p: (a: A) => boolean): IIterable<A> {
  //   return undefined
  // }

  exists(p: (a: A) => boolean): Boolean {
    return !this.find(p).isEmpty
  }

  filter(p: (a: A) => boolean): IIterable<A> {
    return new AbstractIterable<A>(this.toArray().filter(p))
  }

  filterNot(p: (a: A) => boolean): IIterable<A> {
    return new AbstractIterable<A>(this.toArray().filter((x) => !p(x)))
  }

  find(p: (a: A) => boolean): IOption<A> {
    const result = this.toArray().find(p)
    return option(result)
  }

  get head(): A {
    return this.values[0]
  }

  get headOption(): IOption<A> {
    if (this.isEmpty) {
      return option(this.head)
    } else {
      return none()
    }
  }

  get isEmpty(): boolean {
    return this.toArray().length === 0
  }

  get size(): number {
    return 0
  }

  toArray(): A[] {
    return Array.from<A>(this.values)
  }

  reduce<B>(f: (prev: B, curr: A) => B): B {
    return this.toArray().reduce(f, undefined as any)
  }

  reduceRight<B>(f: (prev: B, curr: A) => B): B {
    return this.toArray().reduceRight(f, undefined as any)
  }

  foldLeft<B>(z: B): (op: (b: B, a: A) => B) => B {
    return (f: (b: B, a: A) => B) => {
      return this.toArray().reduce(f, z)
    }
  }

  foldRight<B>(z: B): (op: (a: A, b: B) => B) => B {
    return (f: (a: A, b: B) => B) => {
      return this.toArray().reduceRight((acc, value) => f(value, acc), z)
    }
  }
}
