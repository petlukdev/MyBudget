import penLogo from "../assets/pen.svg";
import trashLogo from "../assets/trash.svg";

import type { Transaction } from "../types/Transaction";

function TransactionDetailsModal({ transaction, onClose }: { transaction: Transaction, onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg mx-5 w-full max-w-lg max-h-screen overflow-y-auto">
                <button className="text-xl text-gray-500 hover:text-gray-700" onClick={onClose}>
                    ⨉
                </button>
                <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
                <form onSubmit={(e) => { e.preventDefault(); alert("Test"); }}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" value={transaction.title} readOnly className="w-full p-2 border border-gray-300 rounded"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <input type="number" value={transaction.amount} readOnly className="w-full p-2 border border-gray-300 rounded"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input type="text" value={transaction.category} readOnly className="w-full p-2 border border-gray-300 rounded"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" value={new Date(transaction.date).toISOString().split('T')[0]} readOnly className="w-full p-2 border border-gray-300 rounded"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea value={transaction.description || ""} readOnly className="w-full p-2 border border-gray-300 rounded"/>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <button type="submit" className="bg-blue-300/40 rounded p-2 hover:bg-blue-300/60 transition-colors">
                            <img src={penLogo} alt="Edit" className="w-7 h-7"/>
                        </button>
                        <button type="button" className="bg-red-500/40 rounded p-2 hover:bg-red-500/60 transition-colors">
                            <img src={trashLogo} alt="Delete" className="w-7 h-7"/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TransactionDetailsModal;