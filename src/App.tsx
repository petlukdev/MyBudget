import { useMemo, useState } from 'react'
import type { Transaction } from './types/Transaction'

import plusLogo from './assets/plus.svg'

import Modal from './components/Modal'
import Header from './components/Header'
import DashboardCard from './components/DashboardCard'
import TransactionHistory from './components/TransactionHistory'
import AddTransactionForm from './components/AddTransactionForm'

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      title: 'Grocery Shopping',
      amount: 150,
      date: new Date('2024-06-01'),
      category: 'Shopping',
    },
    {
      id: '2',
      title: 'Salary',
      amount: 2000,
      date: new Date('2024-06-01'),
      category: 'Food',
    }
  ]);

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
      <Header />
      <div className="flex flex-col gap-3 bg-gray-100 min-h-screen p-5">
        <DashboardCard title='Total Balance' value={stats.totalBalance} />
        <DashboardCard title='Income' value={stats.income} />
        <DashboardCard title='Expenses' value={stats.expenses} />
        <TransactionHistory transactions={transactions} setTransactions={setTransactions}/>
        <button className="fixed bottom-5 right-5 p-3 bg-blue-400 rounded-xl shadow-lg"
        onClick={() => setIsFormOpen(true)}>
          <img src={plusLogo} alt="Add Transaction" className="w-8 h-8"/>
        </button>
      </div>
      {isFormOpen &&
        <Modal onClose={() => setIsFormOpen(false)}>
          <AddTransactionForm addTransaction={addTransaction}/>
        </Modal>
      }
    </>
  )
}

export default App
