import { useState } from 'react'
import type { Transaction } from './types/Transaction'

import Header from './components/Header'
import DashboardCard from './components/DashboardCard'
import TransactionHistory from './components/TransactionHistory'
import AddTransactionForm from './components/AddTransactionForm'

function App() {
  const [count, setCount] = useState(0)
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

  return (
    <>
      <Header />
      <div className="flex flex-col gap-3 bg-gray-100 min-h-screen p-5">
        <DashboardCard title='Total Balance' value={1000} />
        <DashboardCard title='Income' value={-50} />
        <TransactionHistory transactions={transactions} setTransactions={setTransactions}/>
      </div>
    </>
  )
}

export default App
