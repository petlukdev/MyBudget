import { Currency } from "../types/Currency";
import { useCurrency } from "../hooks/useCurrency";

function DashboardCard({ title, value = 0 }: { title: string; value: number }) {
    const { base, convert} = useCurrency();
    value = convert(value, Currency.EUR, base);
    
    return (
        <div className="flex flex-col justify-center items-center 
        bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className={`text-2xl font-bold text-center ${value <= 0 ? 'text-red-500' : 'text-green-500'}`}>
            {value.toLocaleString()} {base}
        </p>
        </div>
    );
}

export default DashboardCard;