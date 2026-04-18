import { useState, useEffect, useMemo } from 'react';
import type { Transaction } from '../types/Transaction';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
        const stored = localStorage.getItem('transactions');
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error retrieving transactions from localStorage:', error);
        return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const stats = useMemo(() => {
    return transactions.reduce(
        (acc, t) => {
            acc.totalBalance += t.amount;
            if (t.amount > 0) acc.income += t.amount;
            if (t.amount < 0) acc.expenses += t.amount;
            return acc;
        },
        { totalBalance: 0, income: 0, expenses: 0 }
    );
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => {
      const updated = [transaction, ...prev];
      return updated.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  };

  return { 
    transactions, 
    setTransactions, 
    stats, 
    addTransaction 
  };
};