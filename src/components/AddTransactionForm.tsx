import { Category } from "../types/Category";
import { Currency } from "../types/Currency";
import { useCurrency } from "../hooks/useCurrency";

import type { Transaction } from "../types/Transaction";

function AddTransactionForm({ addTransaction }: { addTransaction: (transaction: Transaction) => void }) {
    const { base, convert} = useCurrency();
    
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const transaction: Transaction = {
            id: Date.now().toString(),
            title: formData.get("title") as string,
            amount: convert(parseFloat(formData.get("amount") as string), base, Currency.EUR),
            date: new Date(formData.get("date") as string),
            category: formData.get("category") as Category,
            description: formData.get("description") as string
        };
        addTransaction(transaction);
    };
  
    return (
    <>
        <h2 className="text-xl font-bold mb-4">New Transaction</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input required name="title" type="text" className="w-full p-2 border border-gray-300 rounded"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Amount (positive/negative)</label>
                <div className="flex items-center gap-5">
                    <input required name="amount" type="number" className="w-full p-2 border border-gray-300 rounded"/>
                    <label>{base}</label>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input required name="date" type="date" className="w-full p-2 border border-gray-300 rounded"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select required name="category" className="w-full p-2 border border-gray-300 rounded">
                    {Object.values(Category).map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" className="w-full p-2 border border-gray-300 rounded"/>
            </div>
            <button type="submit" className="flex justify-self-end px-4 py-2 bg-blue-500 text-white rounded">Add Transaction</button>
        </form>
    </>
  );
}

export default AddTransactionForm;