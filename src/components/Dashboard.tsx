import useTransactions from '../hooks/useTransactions';

import DashboardCard from './DashboardCard';

export default function Dashboard() {
  
  const { stats } = useTransactions();

  return (
    <section className='flex flex-col gap-4 justify-center col-span-3 sm:grid sm:grid-cols-3 sm:mb-0'>
        <DashboardCard title='Total Balance' value={stats.totalBalance} />
        <DashboardCard title='Income' value={stats.income} />
        <DashboardCard title='Expenses' value={stats.expenses} />
    </section>
  );
}