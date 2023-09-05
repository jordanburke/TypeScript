import { Some } from "./Some"
import { None } from "./None"
import { Type } from "../functor"
import { IOption } from "./IOption"

export const option = <T extends Type>(value?: T): IOption<T> => (value ? some(value) : none<T>())
export const some = <T extends Type>(value: T): IOption<T> => new Some(value)
export const none = <T extends Type>(): IOption<T> => new None<T>()
