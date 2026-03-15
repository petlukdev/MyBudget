import { useContext } from "react";
import { BaseCurrencyContext } from "../contexts/CurrencyContext";
import type { Currency } from "../types/Currency";

function DashboardCard({ title, value = 0 }: { title: string; value: number }) {
    const currency : Currency = useContext(BaseCurrencyContext);
    
    return (
        <div className="flex flex-col justify-center items-center 
        bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className={`text-2xl font-bold ${value <= 0 ? 'text-red-500' : 'text-green-500'}`}>
            {value.toLocaleString()} {currency}
        </p>
        </div>
    );
}

export default DashboardCard;