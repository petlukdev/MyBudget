import { Currency } from "../types/Currency";
import { useCurrency } from "../hooks/useCurrency";

function Header() {
  const { base, setBase } = useCurrency();

  const handleSetBase = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBase(e.target.value as Currency);
  };
  
  return (
    <header className="sticky top-0 z-10 px-5 bg-white border-b border-gray-200 text-center">
      <div className="flex items-center justify-between py-3 mx-auto lg:container">
        <h1 className="text-2xl">My<b>Budget</b></h1>
        <select
          defaultValue={base}
          onChange={handleSetBase}
          aria-label="Select currency"
          className="bg-white border border-gray-300 rounded p-1">
            {Object.values(Currency).map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
        </select>
      </div>
    </header>
  );
}

export default Header;