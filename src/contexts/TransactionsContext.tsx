import { ReactNode, createContext, useEffect, useState } from 'react'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  amount: number
  createdAt: Date
}

interface TransactionsContextProps {
  children: ReactNode
}

interface TransactionContextType {
  transactions: Transaction[]
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsContextProvider({
  children,
}: TransactionsContextProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
