import Header from './components/Header'
import MainPage from './components/MainPage'

import { CurrencyProvider } from './contexts/CurrencyContext'

function App() {
  return (
    <CurrencyProvider>
      <Header/>
      <MainPage/>
    </CurrencyProvider>
  )
}

export default App
