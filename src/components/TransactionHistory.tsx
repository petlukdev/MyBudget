import { useState, useMemo, useEffect } from "react";
import { exportToJson, importFromJson } from "../utils/FileProvider";
import type { Transaction } from "../types/Transaction";

import Modal from "./Modal";
import TransactionDetails from "./TransactionDetails";
import TransactionHeader from "./TransactionHeader";
import TransactionControls from "./TransactionControls";
import TransactionList from "./TransactionList";
import Pagination from "./Pagination";

interface TransactionHistoryProps {
    transactions: Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

function TransactionHistory({ transactions, setTransactions }: TransactionHistoryProps) {
    const [selectedItem, setSelectedItem] = useState<Transaction | null>(null);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const filteredTransactions = filter === '' 
        ? transactions 
        : transactions.filter(t => t.category === filter);
    
    const totalPages = Math.ceil(filteredTransactions.length / perPage);

    const paginatedTransactions = useMemo(() => {
        const start = (page - 1) * perPage;
        return filteredTransactions.slice(start, start + perPage);
    }, [filteredTransactions, page, perPage]);

    useEffect(() => {
        setPage(1);
    }, [filter, perPage]);

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
    };
    
    return (
        <section className="bg-white shadow-lg rounded-lg p-4 col-start-2 col-end-4 max-h-max">
            <TransactionHeader 
                onImport={handleImport} 
                onExport={() => exportToJson(transactions, 'transaction_history')} 
            />
            <TransactionControls 
                filter={filter} 
                setFilter={setFilter} 
                perPage={perPage} 
                setPerPage={setPerPage} 
            />
            <hr className="my-4 border-gray-300"/>
            <TransactionList 
                transactions={paginatedTransactions} 
                onItemClick={setSelectedItem} 
            />
            <hr className={`my-4 border-gray-300 ${filteredTransactions.length === 0 ? 'hidden' : ''}`}/>
            <Pagination 
                page={page} 
                totalPages={totalPages} 
                onPageChange={setPage} 
                isHidden={filteredTransactions.length === 0} 
            />
            {selectedItem && (
                <Modal onClose={() => setSelectedItem(null)}>
                    <TransactionDetails 
                        transaction={selectedItem}
                        onUpdate={(update) => setTransactions(prev => prev.map(t => t.id === update.id ? update : t))}
                        onDelete={(transaction) => setTransactions(prev => prev.filter(t => t.id !== transaction.id))}
                    />
                </Modal>
            )}
        </section>
    );
}

export default TransactionHistory;