import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import type { Transaction } from "../types/Transaction";

import Modal from "./Modal";
import Dashboard from "./Dashboard";
import AddTransactionForm from "./AddTransactionForm";
import TransactionHistory from "./TransactionHistory";
import AddTransactionButton from "./AddTransactionButton";
import AddTransactionContainer from "./AddTransactionContainer";

function MainPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { transactions, setTransactions, stats, addTransaction } = useTransactions();

  const handleAddModal = (t : Transaction) => {
    addTransaction(t);
    setIsFormOpen(false);
  }

  return (
    <main className="bg-gray-100 flex-1 p-5">
        <div className='flex flex-col gap-3 mx-auto lg:container lg:grid lg:grid-rows-[auto_1fr] lg:gap-5'>
            <section className='lg:max-h-32'>
                <Dashboard stats={stats}/>
            </section>
            <section className='lg:grid lg:grid-cols-3 lg:gap-4 lg:min-h-0'>
                <AddTransactionContainer addTransaction={addTransaction}/>
                <TransactionHistory transactions={transactions} setTransactions={setTransactions}/>
            </section>
        </div>
        <AddTransactionButton onClick={() => setIsFormOpen(true)}/>
        {isFormOpen &&
            <Modal onClose={() => setIsFormOpen(false)}>
                <AddTransactionForm addTransaction={handleAddModal}/>
            </Modal>
        }
    </main>
  );
}

export default MainPage;