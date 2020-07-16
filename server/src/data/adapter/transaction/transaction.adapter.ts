import { Transaction } from "src/business/entity/transaction/transaction.entity";
import { BaseEntityAdapter } from "../contract/base.entity.adapter";

export class TransactionAdapter extends BaseEntityAdapter<Transaction> {

    public adapt(v: any): Transaction {
        const id = Number(v.id);
        const name = String(v.name);
        const type = Number(v.type);
        const value = Number(v.value);
        const date = new Date(v.date);
        const account = v.account;
        const targetAccount = v.targetAccount;
        const category = v.category;
        return {
            id,
            name,
            type,
            value,
            date,
            account,
            targetAccount,
            category,
        };
    }
}