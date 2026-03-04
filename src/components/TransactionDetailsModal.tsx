import penLogo from "../assets/pen.svg";
import trashLogo from "../assets/trash.svg";

import { useEffect, useState } from "react";
import { Category } from "../types/Category";
import type { Transaction } from "../types/Transaction";

function TransactionDetailsModal({ transaction, onClose, onUpdate, onDelete }: { transaction: Transaction, onClose: () => void, onUpdate: (updatedTransaction: Transaction) => void, onDelete: (transaction: Transaction) => void }) {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState(transaction);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 200);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'amount' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        setIsVisible(false);
        onUpdate(formData);
        setTimeout(onClose, 200);
    }

    const handleDelete = () => {
        setIsVisible(false);
        onDelete(formData);
        setTimeout(onClose, 200);
    }

    useEffect(() => {
        setFormData(transaction);
    }, [transaction]);

    return (
        <div className={`fixed inset-0 bg-black/75 flex items-center justify-center z-50 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-white p-5 rounded-lg mx-5 w-full max-w-lg max-h-screen overflow-y-auto relative transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}>
                <button className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-700" onClick={handleClose}>
                    ⨉
                </button>
                <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 rounded"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <div className="flex items-center gap-5">
                            <input type="number" name="amount" step="10" value={formData.amount} onChange={handleChange} 
                                className="w-full p-2 border border-gray-300 rounded"/>
                            <label>CZK</label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
                            {Object.values(Category).map((category) => (
                                <option value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" name="date" value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''} 
                            onChange={handleChange} className="w-full p-2 border border-gray-300 rounded"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea name="description" value={formData.description || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded"/>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <button type="submit" className="bg-blue-300/40 rounded p-2 hover:bg-blue-300/60 transition-colors">
                            <img src={penLogo} alt="Edit" className="w-7 h-7"/>
                        </button>
                        <button type="button" className="bg-red-500/40 rounded p-2 hover:bg-red-500/60 transition-colors" onClick={handleDelete}>
                            <img src={trashLogo} alt="Delete" className="w-7 h-7"/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TransactionDetailsModal;