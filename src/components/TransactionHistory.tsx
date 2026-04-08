import Modal from "./Modal";
import LazyDummy from "./LazyDummy";
import TransactionDetails from "./TransactionDetails";

import importLogo from "../assets/import.svg";
import exportLogo from "../assets/export.svg";
import arrLeftLogo from "../assets/arrow-left.svg";
import arrRightLogo from "../assets/arrow-right.svg";

import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { exportToJson, importFromJson } from "../utils/FileProvider";
import { Category } from "../types/Category";
import type { Transaction } from "../types/Transaction";

const TransactionHistoryItem = lazy(() => import('./TransactionHistoryItem'));

function TransactionHistory({ transactions, setTransactions }: { transactions: Transaction[], setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>> }) {
    const [selectedItem, setSelectedItem] = useState<Transaction | null>(null);

    const [filter, setFilter] = useState('');

    const filteredTransactions = filter === '' ? transactions : transactions.filter(t => t.category === filter);
    
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const totalPages = Math.ceil(filteredTransactions.length / perPage);

    const paginatedTransactions = useMemo(() => {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return filteredTransactions.slice(start, end);
    }, [filteredTransactions, page, perPage]);

    useEffect(() => {
        setPage(1);
    }, [filter, perPage]);
    
    const handleCloseModal = () => {
        setSelectedItem(null);
    }

    const handleUpdate = (update: Transaction) => {
        setTransactions(prev => prev.map(t => t.id === update.id ? update : t));
    }

    const handleDelete = (transaction: Transaction) => {
        setTransactions(prev => prev.filter(t => t.id !== transaction.id));
    }

    const handleImport = () => {
        importFromJson().then(data => {
            setTransactions(prev => {
                const updated = [...data, ...prev];
                const unique = updated.filter((t, index) => 
                    updated.findIndex(other => other.id === t.id) === index
                );
                return unique.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            });
        }).catch(err => {
            console.error(err.message);
            alert('Failed to import transactions. Please make sure the file is a valid JSON with the correct structure.');
        });
    }
    
    return (
        <section className="bg-white shadow-lg rounded-lg p-4 col-start-2 col-end-4 max-h-max">
            <div className="flex flex-row items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Transaction History</h2>
                <div className="flex flex-row gap-3 items-center">
                    <button className="bg-blue-300 rounded-sm p-2 cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                    onClick={handleImport}
                    title="Import JSON">
                        <img src={importLogo} alt="Import" className="w-5 h-5"/>
                    </button>
                    <button className="bg-blue-300 rounded-sm p-2 cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                    onClick={() => exportToJson(transactions, 'transaction_history')}
                    title="Export JSON">
                        <img src={exportLogo} alt="Export" className="w-5 h-5"/>
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-stretch gap-4 mb-4 sm:flex-row">
                <div className="grid grid-cols-2 items-center gap-4 w-full sm:flex">
                    <p className="text-nowrap">Filter by category:</p>
                    <select className="bg-white border border-gray-300 rounded w-full p-1 
                    focus:outline-none open:ring-2 open:ring-black"
                    onChange={(e) => setFilter(e.target.value)}>
                        <option value="">All Categories</option>
                        {Object.values(Category).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="hidden w-px bg-gray-300 mx-2 sm:block"></div>
                <div className="grid grid-cols-2 items-center gap-4 w-full sm:flex">
                    <p className="text-nowrap">Items per page:</p>
                    <select className="bg-white border border-gray-300 rounded w-full p-1 
                    focus:outline-none open:ring-2 open:ring-black"
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}>
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
            <hr className="my-4 border-gray-300"/>
            <div>
                <ul className="gap-2 flex flex-col">
                    {paginatedTransactions.map((transaction) => (
                            <Suspense key={transaction.id} fallback={<LazyDummy />}>
                                <TransactionHistoryItem 
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
            <hr className={`my-4 border-gray-300 ${filteredTransactions.length === 0 ? 'hidden' : ''}`}/>
            <div className={`flex items-center mt-4 justify-center gap-5 lg:justify-between ${filteredTransactions.length === 0 ? 'hidden' : ''}`}>
                <button className="cursor-pointer hover:opacity-70"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                >
                    <img src={arrLeftLogo} alt="Previous" className="w-7 h-7"/>
                </button>
                <span className="select-none">{page} / {totalPages || 1}</span>
                <button className="cursor-pointer hover:opacity-70"
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(p => p + 1)}
                >
                    <img src={arrRightLogo} alt="Next" className="w-7 h-7"/>
                </button>
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