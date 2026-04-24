import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import type {
  ChartData,
  ChartOptions
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { Currency } from '../types/Currency';
import useCurrency from '../hooks/useCurrency';
import useTransactions from '../hooks/useTransactions';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_SHORT = MONTHS.map(month => month.slice(0, 3));

export default function AnnualChart() {

    const { transactions } = useTransactions();
    const { base, convert } = useCurrency();

    const monthlyIncome = new Array(12).fill(0);
    const monthlyExpenses = new Array(12).fill(0);
    const currentYear = new Date().getFullYear();

    transactions.forEach(transaction => {
        const date = new Date(transaction.date);
        if (date.getFullYear() !== currentYear) return;

        const monthIndex = date.getMonth();
        const amount = convert(transaction.amount, Currency.EUR, base);

        if (amount > 0) {
            monthlyIncome[monthIndex] += amount;
        } else {
            monthlyExpenses[monthIndex] += Math.abs(amount);
        } 
    });

    const data: ChartData<'bar'> = {
        labels: MONTHS_SHORT,
        datasets: [
            {
                label: 'Income',
                data: monthlyIncome,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                minBarLength: 5
            },
            {
                label: 'Expenses',
                data: monthlyExpenses,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                minBarLength: 5
            }
        ]
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Income and expenses for this year'
            },
            tooltip: {
                callbacks: {
                    title: (context) => {
                        return MONTHS[context[0].dataIndex];
                    },
                    label: (context) => {
                        const value = context.raw as number;
                        return `${context.dataset.label}: ${value.toLocaleString()} ${base}`;
                    }
                }
            }
        }
    };

    return (
        <div className='w-full min-w-0 bg-white border border-gray-100 rounded-xl shadow-sm p-4'>
            <div className='relative w-full h-80'>
                <Bar data={data} options={options}/>
            </div>
        </div>
    );
}