import { createContext } from "react";
import { CurrencyConverter } from "../utils/CurrencyConverter";

const converter = new CurrencyConverter();
await converter.initRates();

const BaseCurrencyContext = createContext(converter.getBase());

function BaseCurrencyProvider({ children } : { children: React.ReactNode }) {
  return (
    <BaseCurrencyContext.Provider value={converter.getBase()}>
      {children}
    </BaseCurrencyContext.Provider>
  );
}

export { BaseCurrencyProvider, BaseCurrencyContext };