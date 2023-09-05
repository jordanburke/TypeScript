import { Type } from "../functor"
import { List } from "./List"

const list = <T extends Type>(items: T[] | undefined) => new List<T>(items)

export { list }
