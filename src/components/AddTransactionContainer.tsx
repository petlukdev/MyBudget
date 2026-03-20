import AddTransactionForm from "./AddTransactionForm";
import type { Transaction } from "../types/Transaction";

function AddTransactionContainer({ addTransaction } : { addTransaction: (transaction: Transaction) => void }) {
    return (
        <aside className="hidden bg-white p-5 rounded-lg shadow-lg max-h-max lg:flex lg:flex-col">
            <AddTransactionForm addTransaction={addTransaction} />
        </aside>
    )
}

export default AddTransactionContainer;