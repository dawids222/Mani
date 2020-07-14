export interface Category {
    id: number;
    name: string;
    logo: string;
    color: string;
    subcategories: Category[];
}