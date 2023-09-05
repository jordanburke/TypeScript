export type SingleType = any

export type ArrayType = SingleType[]

export type Type = SingleType | ArrayType

export interface IAbstractFunctor<A extends Type> {
  map(f: (value: A) => Type): IAbstractFunctor<Type>

  flatMap(f: (value: A) => IAbstractFunctor<Type>): IAbstractFunctor<Type>
}

export interface IFunctor<A extends Type> extends IAbstractFunctor<A> {
  map<B extends Type>(f: (value: A) => B): IFunctor<B>

  flatMap<B extends Type>(f: (value: A) => IFunctor<B>): IFunctor<B>
}

export interface IArrayFunctor<A extends ArrayType> extends IAbstractFunctor<A> {
  map<U extends ArrayType>(f: (value: A) => U): IArrayFunctor<U>

  flatMap<U extends ArrayType>(f: (value: A) => IArrayFunctor<U>): IArrayFunctor<U>
}
