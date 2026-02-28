import type { Category } from "./Category";

export type Transaction = {
    id: string;
    title: string;
    amount: number;
    date: Date;
    category: Category;
    description?: string;
};