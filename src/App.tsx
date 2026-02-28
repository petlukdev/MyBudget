import { useState } from 'react'
import type { Transaction } from './types/Transaction'

import Header from './components/Header'
import DashboardCard from './components/DashboardCard'
import TransactionHistory from './components/TransactionHistory'

function App() {
  const [count, setCount] = useState(0)
  const transactions: Transaction[] = [
    {
      id: '1',
      title: 'Grocery Shopping',
      amount: 150,
      date: new Date('2024-06-01'),
      category: 'Shopping',
    }
  ]

  return (
    <>
      <Header />
      <div className="flex flex-col bg-gray-100 min-h-screen p-5">
        <DashboardCard title='Total Balance' value={1000} />
        <DashboardCard title='Income' value={-50} />
        <TransactionHistory transactions={transactions}/>
      </div>
    </>
  )
}

export default App
