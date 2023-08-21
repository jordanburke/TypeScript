import {Left} from "./Left";
import {Right} from "./Right";

export type Either<L, R> = Left<L, R> | Right<L, R>;

// Helper functions
export const left = <L, R>(value: L): Either<L, R> => new Left(value);
export const right = <L, R>(value: R): Either<L, R> => new Right(value);

// Usage example:
export const parseNumber = (input: string): Either<string, number> => {
    const result = parseInt(input, 10);
    if (isNaN(result)) {
        return left("Invalid number");
    }
    return right(result);
}


