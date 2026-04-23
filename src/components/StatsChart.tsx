import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import type {
    ChartData,
    ChartOptions
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Currency } from '../types/Currency';
import { useCurrency } from '../hooks/useCurrency';
import { useTransactions } from '../hooks/useTransactions';

ChartJS.register(ArcElement, Tooltip, Legend);

function StatsChart() {

    const { stats } = useTransactions();
    const { base, convert } = useCurrency();

    const convertedIncome = convert(stats.income, Currency.EUR, base);
    const convertedExpenses = convert(stats.expenses, Currency.EUR, base);

    const data: ChartData<'doughnut'> = {
        labels: ['Income', 'Expense'],
        datasets: [
            {
                label: 'Financial Overview',
                data: [convertedIncome, Math.abs(convertedExpenses)],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }
        ]
    };

    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Financial Overview'
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw as number;
                        return `${context.label}: ${value.toLocaleString()} ${base}`;
                    }
                }
            }
        },
        cutout: '70%'
    };

    return (
        <div className='w-full max-w-xl lg:flex-1'>
            <div className='relative w-full h-80'>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
}

export default StatsChart;