import Modal from "./Modal";
import TransactionHistoryItem from "./TransactionHistoryItem";
import TransactionDetails from "./TransactionDetails";

import { useState } from "react";
import { Category } from "../types/Category";
import type { Transaction } from "../types/Transaction";

function TransactionHistory({ transactions, setTransactions }: { transactions: Transaction[], setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>> }) {
    const [selectedItem, setSelectedItem] = useState<Transaction | null>(null);

    const handleCloseModal = () => {
        setSelectedItem(null);
    }

    const handleUpdateTransaction = (updatedTransaction: Transaction) => {
        setTransactions(prev => prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
    }

    const handleDeleteTransaction = (transaction: Transaction) => {
        setTransactions(prev => prev.filter(t => t.id !== transaction.id));
    }
    
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
                <ul className="gap-2 flex flex-col">
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
                <Modal 
                children={
                    <TransactionDetails 
                    transaction={selectedItem}
                    onUpdate={handleUpdateTransaction}
                    onDelete={handleDeleteTransaction}
                    />
                }
                onClose={handleCloseModal}/>
            )}
        </div>
    );
}

export default TransactionHistory;