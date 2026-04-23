import Header from './components/Header'
import MainPage from './components/MainPage'

import { CurrencyProvider } from './contexts/CurrencyContext'
import { TransactionsProvider } from './contexts/TransactionsContext'

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <CurrencyProvider>
        <Header/>
        <TransactionsProvider>
          <MainPage/>
        </TransactionsProvider>
      </CurrencyProvider>
    </div>
  )
}

export default App
