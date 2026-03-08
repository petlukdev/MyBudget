import { Category } from "../types/Category";
import type { Transaction } from "../types/Transaction";

function AddTransactionForm({ addTransaction }: { addTransaction: (transaction: Transaction) => void }) {
  return (
    <>
        <h2 className="text-xl font-bold mb-4">New Transaction</h2>
        <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input required type="text" className="w-full p-2 border border-gray-300 rounded"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Amount (positive/negative)</label>
                <div className="flex items-center gap-5">
                    <input required type="number" className="w-full p-2 border border-gray-300 rounded"/>
                    <label>CZK</label>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input required type="date" className="w-full p-2 border border-gray-300 rounded"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select required className="w-full p-2 border border-gray-300 rounded">
                    {Object.values(Category).map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="flex justify-self-end px-4 py-2 bg-blue-500 text-white rounded">Add Transaction</button>
        </form>
    </>
  );
}

export default AddTransactionForm;