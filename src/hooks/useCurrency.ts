import { useContext } from "react";
import { CurrencyContext } from "../contexts/CurrencyContext";

export default function useCurrency() {
    const ctx = useContext(CurrencyContext);
    if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider.");
    return ctx;
}