import Modal from "./Modal";
import LazyDummy from "./LazyDummy";
import TransactionDetails from "./TransactionDetails";

import { useState, lazy, Suspense } from "react";
import { Category } from "../types/Category";
import type { Transaction } from "../types/Transaction";

const TransactionHistoryItem = lazy(() => import('./TransactionHistoryItem'));

function TransactionHistory({ transactions, setTransactions }: { transactions: Transaction[], setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>> }) {
    const [selectedItem, setSelectedItem] = useState<Transaction | null>(null);

    const [filter, setFilter] = useState('');

    const filteredTransactions = filter === '' ? transactions : transactions.filter(t => t.category === filter);
    
    const handleCloseModal = () => {
        setSelectedItem(null);
    }

    const handleUpdate = (update: Transaction) => {
        setTransactions(prev => prev.map(t => t.id === update.id ? update : t));
    }

    const handleDelete = (transaction: Transaction) => {
        setTransactions(prev => prev.filter(t => t.id !== transaction.id));
    }
    
    return (
        <section className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Transaction History</h2>
            <div className="flex items-center gap-4 mb-4">
                <p className="text-nowrap">Filter by category:</p>
                <select className="bg-white border border-gray-300 rounded w-full p-1 
                focus:outline-none open:ring-2 open:ring-black"
                onChange={(e) => setFilter(e.target.value)}>
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
                    {filteredTransactions.map((transaction) => (
                            <Suspense fallback={<LazyDummy />}>
                                <TransactionHistoryItem 
                                key={transaction.id} 
                                transaction={transaction} 
                                onClick={() => setSelectedItem(transaction)}
                                />
                            </Suspense>
                    ))}
                    {filteredTransactions.length === 0 && (
                        <p className="text-center text-gray-500">No transactions found.</p>
                    )}
                </ul>
            </div>
            {selectedItem && (
                <Modal onClose={handleCloseModal}>
                    <TransactionDetails 
                        transaction={selectedItem}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                </Modal>
            )}
        </section>
    );
}

export default TransactionHistory;