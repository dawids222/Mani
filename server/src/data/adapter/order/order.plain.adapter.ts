import { OrderPlain } from "src/business/entity/order/order.plain";
import { BaseEntityAdapter } from "../contract/base.entity.adapter";

export class OrderPlainAdapter extends BaseEntityAdapter<OrderPlain> {

    // accountId: number;
    // accountTargetId: number | null;
    // categoryId: number | null;

    public adapt(v: any): OrderPlain {
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
        const accountId = v.accountId ? Number(v.accountId) : null;
        const accountTargetId = v.accountTargetId ? Number(v.accountTargetId) : null;
        const categoryId = v.categoryId ? Number(v.categoryId) : null;
        return {
            id,
            name,
            type,
            value,
            isActive,
            triggerDays,
            triggerMonths,
            accountId,
            accountTargetId,
            categoryId,
        }
    }
}