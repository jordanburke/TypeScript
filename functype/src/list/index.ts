import { List } from "./List"

const list = <T>(items: T[] | undefined) => new List<T>(items)

export { list, List }