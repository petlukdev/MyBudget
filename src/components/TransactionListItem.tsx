import foodLogo from "../assets/food.svg";
import healthLogo from "../assets/health.svg";
import travelLogo from "../assets/travel.svg";
import transportLogo from "../assets/transport.svg";
import educationLogo from "../assets/education.svg";
import clothingLogo from "../assets/clothing.svg";
import entertainmentLogo from "../assets/entertainment.svg";
import shoppingLogo from "../assets/shopping.svg";
import otherLogo from "../assets/other.svg";

import { Category } from "../types/Category";
import { Currency } from "../types/Currency";
import useCurrency from "../hooks/useCurrency";
import type { Transaction } from "../types/Transaction";

const categoryIcons: Record<string, string> = {
    [Category.FOOD]: foodLogo,
    [Category.HEALTH]: healthLogo,
    [Category.TRAVEL]: travelLogo,
    [Category.TRANSPORT]: transportLogo,
    [Category.EDUCATION]: educationLogo,
    [Category.CLOTHING]: clothingLogo,
    [Category.ENTERTAINMENT]: entertainmentLogo,
    [Category.SHOPPING]: shoppingLogo,
    [Category.OTHER]: otherLogo,
};

interface TransactionListItemProps {
    transaction: Transaction;
    onClick: () => void;
}

export default function TransactionListItem({ transaction, onClick } : TransactionListItemProps) {
    
    const { base, convert } = useCurrency();

    const value = convert(transaction.amount, Currency.EUR, base);
    
    return (
        <li>
            <button aria-label={`Open transaction ${transaction.title}`}
            className="w-full grid grid-cols-2 sm:grid-cols-3 items-center gap-3 hover:bg-gray-100 p-1 rounded-lg cursor-pointer transition-colors" onClick={onClick}>
                <div className="flex flex-row items-center gap-2">
                    <img src={categoryIcons[transaction.category]} alt={transaction.category} 
                    className="w-11 h-11 p-1 bg-gray-200 rounded-md" />
                    <div className="text-sm text-left min-w-0">
                        <p className="font-semibold truncate">{transaction.title}</p>
                        <p className="text-xs text-gray-500">{transaction.category}</p>
                    </div>
                </div>
                <p className="hidden text-end text-gray-500 sm:block">
                    {new Date(transaction.date).toLocaleDateString()}
                </p>
                <p className={`grid-start-3 text-end font-bold text-nowrap ${value < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {value.toLocaleString()} {base}
                </p>
            </button>
        </li>
    );
}