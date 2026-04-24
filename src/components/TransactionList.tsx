import { lazy, Suspense } from "react";
import LazyDummy from "./LazyDummy";
import type { Transaction } from "../types/Transaction";

const TransactionHistoryItem = lazy(() => import('./TransactionListItem'));

interface TransactionListProps {
    transactions: Transaction[];
    onItemClick: (transaction: Transaction) => void;
}

export default function TransactionList({ transactions, onItemClick }: TransactionListProps) {
    
    if (transactions.length === 0) {
        return <p className="text-center text-gray-500 my-4">No transactions found.</p>;
    }

    return (
        <ul className="gap-2 flex flex-col">
            {transactions.map((transaction) => (
                <Suspense key={transaction.id} fallback={<LazyDummy />}>
                    <TransactionHistoryItem 
                        transaction={transaction} 
                        onClick={() => onItemClick(transaction)}
                    />
                </Suspense>
            ))}
        </ul>
    );
}