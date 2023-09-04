import { IOption } from "../option"
import { IFunctor, Type } from "../index"

export interface IIterable<A extends Type> extends IFunctor<A> {
  count(p: (x: A) => boolean): number

  find(p: (a: A) => boolean): IOption<A>

  forEach(f: (a: A) => void)

  // drop(n: number): IIterable<A>
  //
  // dropRight(n: number): IIterable<A>
  //
  // dropWhile(p: (a: A) => boolean): IIterable<A>

  exists(p: (a: A) => boolean): Boolean

  filter(p: (a: A) => boolean): IIterable<A>

  filterNot(p: (a: A) => boolean): IIterable<A>

  //flatten<B>() : Iterable<B>;

  reduce(f: (b: A, a: A) => A): A

  reduceRight(f: (b: A, a: A) => A): A

  foldLeft<B>(z: B): (op: (b: B, a: A) => B) => B

  foldRight<B>(z: B): (op: (a: A, b: B) => B) => B

  get head(): A

  get headOption(): IOption<A>

  get isEmpty(): boolean

  map<B extends Type>(f: (a: A) => B): IIterable<B>

  flatMap<B extends Type>(f: (a: A) => IIterable<B>): IIterable<B>

  get size(): number

  toArray(): readonly A[]

  // toList(): IList<A>
  //
  // toSet(): ISet<A>
}
