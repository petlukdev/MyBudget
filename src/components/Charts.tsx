import AnnualChart from "./AnnualChart";
import StatsChart from "./StatsChart";

function Charts() {
  return (
    <div className="grid grid-cols-1 w-full gap-4 mt-5 lg:grid-cols-2">
      <StatsChart />
      <AnnualChart />
    </div>
  );
}

export default Charts;