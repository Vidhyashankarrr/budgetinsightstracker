import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const IncomeChart = ({ incomeList }) => {
  const data = {
    labels: incomeList.map(t => t.title),
    datasets: [
      {
        label: "Income Amount",
        data: incomeList.map(t => t.amount),
        backgroundColor: "#22c55e",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow h-fit">
      <h3 className="font-semibold mb-4">Income Trend</h3>
      <Bar data={data} />
    </div>
  );
};

export default IncomeChart;

