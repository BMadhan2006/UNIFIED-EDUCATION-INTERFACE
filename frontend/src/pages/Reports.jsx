import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import DashboardChart from "../components/DashboardChart";
import Loading from "../components/Loading";

function Reports() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    timetable: 0,
    attendance: 0,
    marks: 0,
    enrollments: 0,
    assignments: 0,
    fees: 0,
    library: 0,
    notifications: 0,
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    loadData();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        students,
        teachers,
        courses,
        timetable,
        attendance,
        marks,
        enrollments,
        assignments,
        fees,
        library,
        notifications,
      ] = await Promise.all([
        api.get("/students", { headers }),
        api.get("/teachers", { headers }),
        api.get("/courses", { headers }),
        api.get("/timetable", { headers }),
        api.get("/attendance", { headers }),
        api.get("/marks", { headers }),
        api.get("/enrollments", { headers }),
        api.get("/assignments", { headers }),
        api.get("/fees", { headers }),
        api.get("/library", { headers }),
        api.get("/notifications", { headers }),
      ]);

      setStats({
        students: students.data.length,
        teachers: teachers.data.length,
        courses: courses.data.length,
        timetable: timetable.data.length,
        attendance: attendance.data.length,
        marks: marks.data.length,
        enrollments: enrollments.data.length,
        assignments: assignments.data.length,
        fees: fees.data.length,
        library: library.data.length,
        notifications: notifications.data.length,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const csv = `Module,Total
Students,${stats.students}
Teachers,${stats.teachers}
Courses,${stats.courses}
Timetable,${stats.timetable}
Attendance,${stats.attendance}
Marks,${stats.marks}
Enrollments,${stats.enrollments}
Assignments,${stats.assignments}
Fees,${stats.fees}
Library,${stats.library}
Notifications,${stats.notifications}`;

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "UEI_Report.csv";
    link.click();
  };

  const cardStyle = {
    width: "180px",
    padding: "20px",
    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
    color: "white",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,.2)",
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Reports</h1>

      <p
        style={{
          color: "#374151",
          fontSize: "17px",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        📅 {currentTime.toLocaleDateString()}
        &nbsp;&nbsp;&nbsp;
        🕒 {currentTime.toLocaleTimeString()}
      </p>

      <button
        onClick={exportCSV}
        style={{
          padding: "10px 20px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Export CSV
      </button>

      <button
        onClick={() => window.print()}
        style={{
          padding: "10px 20px",
          marginLeft: "15px",
          background: "#49153a",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Print Report
      </button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          margin: "30px 0",
        }}
      >
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} style={cardStyle}>
            <h2
              style={{
                color: "white",
                fontSize: "38px",
                margin: 0,
              }}
            >
              {value}
            </h2>

            <p style={{ color: "white", textTransform: "capitalize" }}>
              {key}
            </p>
          </div>
        ))}
      </div>

      <table
        border="1"
        cellPadding="15"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "30px",
        }}
      >
        <thead
          style={{
            background: "#2563EB",
            color: "white",
          }}
        >
          <tr>
            <th>Module</th>
            <th>Total Records</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(stats).map(([key, value]) => (
            <tr key={key}>
              <td style={{ textTransform: "capitalize" }}>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <DashboardChart stats={stats} />

      <Footer />
    </div>
  );
}

export default Reports;