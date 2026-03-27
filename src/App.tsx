import { useEffect, useMemo, useState } from 'react'
import { CurrencyProvider } from './contexts/CurrencyContext'

import type { Transaction } from './types/Transaction'

import Modal from './components/Modal'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import TransactionHistory from './components/TransactionHistory'
import AddTransactionForm from './components/AddTransactionForm'
import AddTransactionButton from './components/AddTransactionButton'
import AddTransactionContainer from './components/AddTransactionContainer'

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem('transactions');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const stats = useMemo(() => {
    const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);
    const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);
    return { totalBalance, income, expenses };
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
    setIsFormOpen(false);
  }

  return (
    <>
      <CurrencyProvider>
        <Header/>
        <main className="bg-gray-100 min-h-screen p-5">
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
        </main>
        {isFormOpen &&
          <Modal onClose={() => setIsFormOpen(false)}>
            <AddTransactionForm addTransaction={addTransaction}/>
          </Modal>
        }
      </CurrencyProvider>
    </>
  )
}

export default App
