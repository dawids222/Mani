import { PaginationQuery } from "./pagination.query";

export interface OrderQuery extends PaginationQuery {
    id: number | undefined;
    categoryId: number | undefined;
    accountId: number | undefined;
    targetAccountId: number | undefined;
}