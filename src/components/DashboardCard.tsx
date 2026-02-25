function DashboardCard({ title, value = 0 }: { title: string; value: number }) {
    const currency : string = 'CZK';
    
    return (
        <div className="flex flex-col justify-center items-center 
        bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className={`text-2xl font-bold ${value <= 0 ? 'text-red-500' : 'text-green-500'}`}>
            {value} {currency}
        </p>
        </div>
    );
}

export default DashboardCard;