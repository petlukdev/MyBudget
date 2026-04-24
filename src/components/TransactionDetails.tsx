import penLogo from "../assets/pen.svg";
import trashLogo from "../assets/trash.svg";

import { useEffect, useState } from "react";
import { Category } from "../types/Category";
import { Currency } from "../types/Currency";
import useCurrency from "../hooks/useCurrency";

import type { Transaction } from "../types/Transaction";

interface TransactionDetailsProps {
    transaction: Transaction;
    onUpdate: (updatedTransaction: Transaction) => void;
    onDelete: (transaction: Transaction) => void;
    onClose?: () => void;
}

export default function TransactionDetails({ transaction, onUpdate, onDelete, onClose } : TransactionDetailsProps) {
    
    const { base, convert } = useCurrency();

    const [formData, setFormData] = useState(transaction);
    const [uiAmount, setUiAmount] = useState(
        convert(transaction.amount, Currency.EUR, base)
    );

    useEffect(() => {
        setFormData(transaction);
        setUiAmount(convert(transaction.amount, Currency.EUR, base));
    }, [transaction, base]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'amount') {
            setUiAmount(Number(value));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        const newAmount = convert(uiAmount, base, Currency.EUR);
        onUpdate({ ...formData, amount: newAmount });
        onClose?.();
    }

    const handleDelete = () => {
        onDelete(formData);
        onClose?.();
    }

    return (
        <>
            <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="input-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text"
                        name="title"
                        id="input-title"
                        value={formData.title}
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="input-amount" className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <div className="flex items-center gap-5">
                        <input type="number"
                            name="amount"
                            id="input-amount"
                            value={uiAmount}
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 rounded"/>
                        <label>{base}</label>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="input-category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select name="category"
                        id="input-category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded">
                            {Object.values(Category).map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="input-date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date"
                        name="date"
                        id="input-date"
                        value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''} 
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="input-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="description"
                        id="input-description"
                        value={formData.description || ""}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"/>
                </div>
                <div className="flex gap-3 justify-end">
                    <button type="submit" className="bg-blue-300/40 rounded p-2 cursor-pointer hover:bg-blue-300/60 transition-colors">
                        <img src={penLogo} alt="Edit" className="w-7 h-7"/>
                    </button>
                    <button type="button" className="bg-red-500/40 rounded p-2 cursor-pointer hover:bg-red-500/60 transition-colors" onClick={handleDelete}>
                        <img src={trashLogo} alt="Delete" className="w-7 h-7"/>
                    </button>
                </div>
            </form>
        </>
    );
}