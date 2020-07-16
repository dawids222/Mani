import { Order } from "src/business/entity/order/order.entity";
import { BaseEntityAdapter } from "../contract/base.entity.adapter";

export class OrderAdapter extends BaseEntityAdapter<Order> {

    public adapt(v: any): Order {
        const id = Number(v.id);
        const name = String(v.name);
        const type = Number(v.type);
        const value = Number(v.value);
        const isActive = Boolean(v.isActive);
        const triggerDays = Array.isArray(v.triggerDays)
            ? v.triggerDays.map((x: any) => Number(x))
            : null;
        const triggerMonths = Array.isArray(v.triggerMonths)
            ? v.triggerMonths.map((x: any) => Number(x))
            : null;
        const account = v.account;
        const targetAccount = v.targetAccount;
        const category = v.category;
        return {
            id,
            name,
            type,
            value,
            isActive,
            triggerDays,
            triggerMonths,
            account,
            targetAccount,
            category,
        }
    }
}