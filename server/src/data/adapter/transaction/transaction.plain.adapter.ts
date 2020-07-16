import { TransactionPlain } from "src/business/entity/transaction/transaction.plain.entity";
import { BaseEntityAdapter } from "../contract/base.entity.adapter";

export class TransactionPlainAdapter extends BaseEntityAdapter<TransactionPlain> {

    public adapt(v: any): TransactionPlain {
        const id = Number(v.id);
        const name = String(v.name);
        const type = Number(v.type);
        const value = Number(v.value);
        const date = String(v.date);
        const accountId = v.accountId ? Number(v.accountId) : null;
        const accountTargetId = v.accountTargetId ? Number(v.accountTargetId) : null;
        const categoryId = v.categoryId ? Number(v.categoryId) : null;
        return {
            id,
            name,
            type,
            value,
            date,
            accountId,
            accountTargetId,
            categoryId,
        };
    }
}