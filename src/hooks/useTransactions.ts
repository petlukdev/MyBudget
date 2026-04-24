import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export default function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error("useTransactions must be used within a TransactionsProvider.");
  return ctx;
};