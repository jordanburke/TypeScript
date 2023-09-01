import { IList } from "./index"

export class List<T> implements IList<T> {
  private readonly items: T[]

  constructor(items?: T[]) {
    this.items = items ? [...items] : []
  }

  readonly [n: number]: T

  isEmpty(): boolean {
    return this.items.length === 0
  }

  // Return the length of the list
  get length(): number {
    return this.items.length
  }

  // Add an item to the list and return a new list
  add(item: T): List<T> {
    const foo = new Map()
    return new List([...this.items, item])
  }

  // Remove the item from the list by index and return a new list
  removeAt(index: number): List<T> {
    if (index < 0 || index >= this.items.length) {
      return this // return the same list if index is out of bounds
    }
    const newItems = [...this.items.slice(0, index), ...this.items.slice(index + 1)]
    return new List(newItems)
  }

  // Retrieve an item by index
  get(index: number): T | undefined {
    return this.items[index]
  }

  // Convert to array (for read-only purposes)
  toArray(): readonly T[] {
    return this.items
  }

  map<U>(f: (value: T) => U): List<U> {
    return new List<U>(this.items.map(f))
  }

  flatMap<U>(f: (value: T) => List<U>): List<U> {
    const tempArray: U[] = []
    for (const item of this.items) {
      const mappedList = f(item)
      if (mappedList instanceof List) {
        tempArray.push(...mappedList.items)
      }
    }
    return new List(tempArray)
  }

  reduce<U>(f: (acc: U, value: T) => U): U {
    return this.items.reduce(f, undefined as any)
  }

  foldLeft<U>(initialValue: U, f: (acc: U, value: T) => U): U {
    return this.items.reduce(f, initialValue)
  }

  foldRight<U>(initialValue: U, f: (value: T, acc: U) => U): U {
    return this.items.reduceRight((acc, value) => f(value, acc), initialValue)
  }

  concat(other: List<T>): List<T> {
    return new List([...this.items, ...other.items])
  }

  toString(): string {
    return `List(${this.items.toString()})`
  }
}
