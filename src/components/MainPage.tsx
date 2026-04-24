import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import type { Transaction } from "../types/Transaction";

import Modal from "./Modal";
import Charts from "./Charts";
import Dashboard from "./Dashboard";
import AddTransactionForm from "./AddTransactionForm";
import TransactionHistory from "./TransactionHistory";
import AddTransactionButton from "./AddTransactionButton";
import AddTransactionContainer from "./AddTransactionContainer";

function MainPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { addTransaction } = useTransactions();

  const handleAddModal = (t : Transaction) => {
    addTransaction(t);
    setIsFormOpen(false);
  }

  return (
    <main className="bg-gray-100 flex-1 p-5">
        <div className='flex flex-col gap-3 mx-auto lg:container lg:grid lg:grid-rows-[auto_1fr] lg:gap-5'>
            <section>
                <Dashboard/>
                <Charts/>
            </section>
            <section className='lg:grid lg:grid-cols-3 lg:gap-4 lg:min-h-0'>
                <AddTransactionContainer/>
                <TransactionHistory/>
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