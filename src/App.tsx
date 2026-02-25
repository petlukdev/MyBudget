import { useState } from 'react'
import DashboardCard from './components/DashboardCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <h1>Hello World!</h1>
      <DashboardCard title='Total Balance' value={1000} />
      <DashboardCard title='Income' value={-50} />
    </div>
  )
}

export default App
