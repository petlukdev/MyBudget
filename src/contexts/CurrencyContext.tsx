import { useState, useEffect, useRef, createContext } from "react";
import { CurrencyConverter } from "../utils/CurrencyConverter";

import type { Currency } from "../types/Currency";
import type { CurrencyContextType } from "../types/CurrencyContextType";

export const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children } : { children: React.ReactNode }) {
  
  const converterRef = useRef<CurrencyConverter>(new CurrencyConverter());

  const [base, setBaseState] = useState<Currency>(
    converterRef.current.getBase()
  );

  const [rates, setRates] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadRates() {
      const r = await converterRef.current.getRates();
      setRates(r);
    }

    loadRates();
  }, []);

  const setBase = async (currency: Currency) => {
    await converterRef.current.setBase(currency);
    setBaseState(currency);

    const r = await converterRef.current.getRates();
    setRates(r);
  };

  const convert = (
    amount: number,
    from: Currency,
    to: Currency
  ) => {
    return converterRef.current.convert(amount, from, to);
  };

  return (
    <CurrencyContext.Provider value={{ base, rates, setBase, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
}