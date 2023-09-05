import { Type } from "../functor"
import { List, IList } from "./List"

const list = <T extends Type>(items: T[] | undefined) => new List<T>(items)

export { list, List, IList }
