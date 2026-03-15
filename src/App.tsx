import { useEffect, useMemo, useState } from 'react'
import { CurrencyProvider } from './contexts/CurrencyContext'

import type { Transaction } from './types/Transaction'

import Modal from './components/Modal'
import Header from './components/Header'
import TransactionHistory from './components/TransactionHistory'
import AddTransactionForm from './components/AddTransactionForm'
import AddTransactionButton from './components/AddTransactionButton'
import Dashboard from './components/Dashboard'

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
        <main className="flex flex-col gap-3 bg-gray-100 min-h-screen p-5">
          <Dashboard stats={stats}/>
          <TransactionHistory transactions={transactions} setTransactions={setTransactions}/>
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
