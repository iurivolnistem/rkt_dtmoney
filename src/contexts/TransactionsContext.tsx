import { ReactNode, useEffect, useState, useCallback } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: Date
}

interface NewTransactionInput {
  description: string
  category: string
  type: string
  price: number
}

interface TransactionsContextProps {
  children: ReactNode
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransactions: (data: NewTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsContextProvider({
  children,
}: TransactionsContextProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  const createTransactions = useCallback(async (data: NewTransactionInput) => {
    const { description, price, category, type } = data

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
