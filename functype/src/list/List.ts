export class List<T> {
  private readonly items: T[]

  constructor(items?: T[]) {
    this.items = items ? [...items] : []
  }

  // Return the length of the list
  get length(): number {
    return this.items.length
  }

  // Add an item to the list and return a new list
  add(item: T): List<T> {
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
}
