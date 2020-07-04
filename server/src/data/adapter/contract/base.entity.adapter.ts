import { IEntityAdapter } from "./entity.adapter";

export abstract class BaseEntityAdapter<T> implements IEntityAdapter<T> {
    public abstract adapt(value: any): T;
    public adaptMany(values: any[]): T[] {
        return values.map(x => this.adapt(x));
    }
}