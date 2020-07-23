import { Account } from "src/business/entity/account/account.entity";
import { BaseEntityAdapter } from "../contract/base.entity.adapter";

export class AccountAdapter extends BaseEntityAdapter<Account> {

    public adapt(value: any): Account {
        const id = Number(value.id);
        const name = String(value.name);
        const balance = Number(value.balance);
        const description = String(value.description);
        const logo = String(value.logo);
        const color = String(value.color);
        return {
            id,
            name,
            balance,
            description,
            logo,
            color,
        };
    }
}