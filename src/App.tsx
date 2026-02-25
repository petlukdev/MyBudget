import { useState } from 'react'
import DashboardCard from './components/DashboardCard'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div className="flex flex-col bg-gray-100 min-h-screen p-5">
        <DashboardCard title='Total Balance' value={1000} />
        <DashboardCard title='Income' value={-50} />
      </div>
    </>
  )
}

export default App
