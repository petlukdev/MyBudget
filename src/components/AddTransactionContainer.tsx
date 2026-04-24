import useTransactions from "../hooks/useTransactions";

import AddTransactionForm from "./AddTransactionForm";

export default function AddTransactionContainer() {
    
    const { addTransaction } = useTransactions();
    
    return (
        <aside className="hidden bg-white p-5 rounded-lg shadow-lg max-h-max lg:flex lg:flex-col">
            <AddTransactionForm addTransaction={addTransaction} />
        </aside>
    )
}