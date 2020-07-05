import { PaginationQuery } from "./pagination.query";

export interface TransactionQuery extends PaginationQuery {
    from: string,
    to: string,
    categoryId: number | undefined;
    accountId: number | undefined;
    targetAccountId: number | undefined;
}