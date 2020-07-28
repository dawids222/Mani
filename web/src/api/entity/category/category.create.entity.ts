export interface CategoryCreate {
    id: number;
    name: string;
    logo: string;
    color: string;
    categoryId: number | null;
}