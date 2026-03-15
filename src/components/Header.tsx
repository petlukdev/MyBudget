import { useContext } from "react";
import { Currency } from "../types/Currency";
import { BaseCurrencyContext } from "../contexts/CurrencyContext";

function Header() {
  const base : Currency = useContext(BaseCurrencyContext);
  
  return (
    <header className="flex items-center justify-between p-5 sticky top-0 z-10 
    bg-white py-3 border-b border-gray-200 text-center">
      <h1 className="text-2xl">My<b>Budget</b></h1>
      <select defaultValue={base} 
      className="bg-white border border-gray-300 rounded p-1 focus:outline-none">
        {Object.values(Currency).map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
    </header>
  );
}

export default Header;