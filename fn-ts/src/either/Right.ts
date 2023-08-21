import {Left} from "./Left";
import {Either} from "./index";

export class Right<L, R> {
    readonly tag = 'Right';

    constructor(public value: R) {}

    isLeft(): this is Left<L, R> {
        return false;
    }

    isRight(): this is Right<L, R> {
        return true;
    }

    map<U>(f: (value: R) => U): Either<L, U> {
        return new Right(f(this.value));
    }

    flatMap<U>(f: (value: R) => Either<L, U>): Either<L, U> {
        return f(this.value);
    }
}

