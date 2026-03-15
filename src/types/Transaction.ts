import type { Category } from "./Category";

// Transactions are always stored in EUR
export type Transaction = {
    id: string;
    title: string;
    amount: number;
    date: Date;
    category: Category;
    description?: string;
};