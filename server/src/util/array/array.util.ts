import { IArrayUtil } from "./contract/array.util";

export class ArrayUtil implements IArrayUtil {

    public partition<T>(
        array: Array<T>,
        isValid: (a: T) => boolean
    ): [Array<T>, Array<T>] {
        return array.reduce(([pass, fail], elem) => {
            return isValid(elem) ?
                [[...pass, elem], fail] :
                [pass, [...fail, elem]];
        }, [[], []]);
    }
}