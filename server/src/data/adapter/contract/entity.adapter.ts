export interface IEntityAdapter<T> {
    adapt(value: any): T;
    adaptMany(values: any[]): T[];
}