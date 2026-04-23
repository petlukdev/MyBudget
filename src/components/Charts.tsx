import AnnualChart from "./AnnualChart";
import StatsChart from "./StatsChart";

function Charts() {
  return (
    <div className="flex flex-col justify-center items-center w-full mb-4 gap-4 lg:flex-row lg:items-stretch">
      <StatsChart />
      <AnnualChart />
    </div>
  );
}

export default Charts;