import { Currency } from "../types/Currency";
import { useCurrency } from "../hooks/useCurrency";

function Header() {
  const { base, setBase } = useCurrency();

  const handleSetBase = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBase(e.target.value as Currency);
  };
  
  return (
    <header className="flex items-center justify-between p-5 sticky top-0 z-10 
    bg-white py-3 border-b border-gray-200 text-center">
      <h1 className="text-2xl">My<b>Budget</b></h1>
      <select defaultValue={base} onChange={handleSetBase}
      className="bg-white border border-gray-300 rounded p-1 focus:outline-none">
        {Object.values(Currency).map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
    </header>
  );
}

export default Header;