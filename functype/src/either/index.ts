import { Either, Left, Right } from "./Either"

// Helper functions
export const left = <L, R>(value: L): Either<L, R> => new Left(value)
export const right = <L, R>(value: R): Either<L, R> => new Right(value)

export { Left, Right, Either }
