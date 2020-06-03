export interface IHasher {
    hash(input: string): string;
    compare(data: string, encrypted: string): boolean;
}