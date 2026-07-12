import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function StatisticsChart({ stats }) {
  const data = [
    { name: "Students", value: stats.students },
    { name: "Teachers", value: stats.teachers },
    { name: "Courses", value: stats.courses },
    { name: "Attendance", value: stats.attendance },
    { name: "Marks", value: stats.marks },
    { name: "Notifications", value: stats.notifications },
  ];

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        marginTop: "40px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
      }}
    >
      <h2>Dashboard Analytics</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="value" fill="#2563EB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatisticsChart;