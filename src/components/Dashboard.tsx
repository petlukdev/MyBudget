import DashboardCard from './DashboardCard';

function Dashboard({ stats }: { stats: any }) {
  return (
    <section className='flex flex-col mb-3 gap-4 justify-center col-span-3 sm:grid sm:grid-cols-3 sm:mb-0'>
        <DashboardCard title='Total Balance' value={stats.totalBalance} />
        <DashboardCard title='Income' value={stats.income} />
        <DashboardCard title='Expenses' value={stats.expenses} />
    </section>
  );
}

export default Dashboard;