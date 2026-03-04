import TransactionHistoryItem from "./TransactionHistoryItem";
import TransactionDetailsModal from "./TransactionDetailsModal";

import { useState } from "react";
import { Category } from "../types/Category";
import type { Transaction } from "../types/Transaction";

function TransactionHistory({ transactions }: { transactions: Transaction[] }) {
    const [selectedItem, setSelectedItem] = useState<Transaction | null>(null);
    
    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Transaction History</h2>
            <div className="flex items-center gap-4 mb-4">
                <p className="text-nowrap">Filter by category:</p>
                <select className="bg-white border border-gray-300 rounded w-full p-1 
                focus:outline-none open:ring-2 open:ring-black">
                    <option value="">All Categories</option>
                    {Object.values(Category).map((category) => (
                        <option value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <hr className="my-4 border-gray-300"/>
            <div>
                <ul>
                    {transactions.map((transaction) => (
                        <TransactionHistoryItem 
                        key={transaction.id} 
                        transaction={transaction} 
                        onClick={() => setSelectedItem(transaction)}
                        />
                    ))}
                </ul>
            </div>
            {selectedItem && (
                <TransactionDetailsModal 
                transaction={selectedItem}
                onClose={() => setSelectedItem(null)}
               />
            )}
        </div>
    );
}

export default TransactionHistory;