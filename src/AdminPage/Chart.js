import React, { memo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Chart = memo(({ leads = [], totalleads = null }) => {
  if (!leads.length || totalleads === null) {
    return <div>Loading...</div>; 
  }

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Monthly Leads Data",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month"
        }
      },
      y: {
        title: {
          display: true,
          text: "Leads Count"
        },
        beginAtZero: true,
      }
    },
  };

  const barData = {
    labels: ["Sept", "Aug", "Jul", "Jun", "May", "Apr", "Mar", "Feb"],
    datasets: [
      {
        label: `Total Leads - ${totalleads}`,
        data: leads.map((d) => d.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-[400px]">
      <Bar data={barData} options={options} />
    </div>
  );
});

export default Chart;