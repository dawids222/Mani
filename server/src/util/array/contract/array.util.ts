export interface IArrayUtil {
    partition<T>(
        array: Array<T>,
        isValid: (a: T) => boolean,
    ): [Array<T>, Array<T>];
}