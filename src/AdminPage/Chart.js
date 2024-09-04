import React from "react";
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

const Chart = ({ leads, totalleads }) => {
  //    console.log(leads)
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
  };

  const lineData = {
    // labels: leads.map(d => `${d._id.month}/${d._id.year}`),
    labels: ["Sept","Aug", "Jul", "Jun", "May", "Apr", "Mar", "Feb"],

    datasets: [
      {
        label: `Total Leads -${totalleads}`,
        data: leads.map((d) => d.count),
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor:"rgba(209, 250, 229, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <div className="h-[400px]">
        <Bar data={lineData} options={options} />
      </div>
     
    </>
  );
};

export default Chart;
