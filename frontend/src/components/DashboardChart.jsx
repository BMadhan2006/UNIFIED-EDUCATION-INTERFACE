import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardChart({ stats }) {
  const data = {
    labels: [
      "Students",
      "Teachers",
      "Courses",
      "Enrollments",
      "Attendance",
      "Marks",
    ],
    datasets: [
      {
        label: "Dashboard Statistics",
        data: [
          stats.students,
          stats.teachers,
          stats.courses,
          stats.enrollments,
          stats.attendance,
          stats.marks,
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div
      style={{
        background: "#bad0df",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Dashboard Statistics</h2>

      <Bar data={data} options={options} />
    </div>
  );
}

export default DashboardChart;