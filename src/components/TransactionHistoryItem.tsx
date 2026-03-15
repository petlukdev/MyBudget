import foodLogo from "../assets/food.svg";
import healthLogo from "../assets/health.svg";
import travelLogo from "../assets/travel.svg";
import transportLogo from "../assets/transport.svg";
import educationLogo from "../assets/education.svg";
import clothingLogo from "../assets/clothing.svg";
import entertainmentLogo from "../assets/entertainment.svg";
import shoppingLogo from "../assets/shopping.svg";
import otherLogo from "../assets/other.svg";

import { useContext } from "react";
import { Category } from "../types/Category";
import type { Currency } from "../types/Currency";
import { BaseCurrencyContext } from "../contexts/CurrencyContext";
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

function TransactionHistoryItem({ transaction, onClick }: { transaction: Transaction, onClick: () => void }) {
    const currency : Currency = useContext(BaseCurrencyContext);
    
    return (
        <li className="flex items-center gap-3 hover:bg-gray-100 p-1 rounded-lg cursor-pointer transition-colors" onClick={onClick}>
            <img src={categoryIcons[transaction.category]} alt={transaction.category} 
            className="w-11 h-11 p-1 bg-gray-200 rounded-md" />
            <div className="text-sm min-w-0">
                <p className="font-semibold truncate">{transaction.title}</p>
                <p className="text-xs text-gray-500">{transaction.category}</p>
            </div>
            <p className={`ml-auto font-bold text-nowrap
                ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {transaction.amount.toLocaleString()} {currency}
            </p>
        </li>
    );
}

export default TransactionHistoryItem;