import { useEffect, useState } from "react";
import api from "../services/api";

function MyAttendance() {
  const [attendance, setAttendance] = useState([]);
  const totalClasses = attendance.length;

const presentClasses = attendance.filter(
  (a) => a.status === "Present"
).length;

const percentage =
  totalClasses > 0
    ? ((presentClasses / totalClasses) * 100).toFixed(1)
    : 0;

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const response = await api.get("/attendance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAttendance(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#181a20",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        📊 My Attendance
        <div
  style={{
    width: "80%",
    margin: "20px auto",
  }}
>
  <h2>
    Attendance Percentage : {percentage}%
  </h2>

  <div
    style={{
      width: "100%",
      height: "25px",
      background: "#444",
      borderRadius: "20px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${percentage}%`,
        height: "100%",
        background:
          percentage >= 75
            ? "green"
            : percentage >= 50
            ? "orange"
            : "red",
        transition: "0.5s",
      }}
    ></div>
  </div>

  <p style={{ marginTop: "10px" }}>
    Present : {presentClasses} / {totalClasses}
  </p>
</div>
      </h1>

      <table
        border="1"
        cellPadding="12"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
          background: "#20232a",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Course</th>
            <th>Attendance Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.length > 0 ? (
            attendance.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.studentName}</td>
                <td>{item.courseName}</td>
                <td>{item.attendanceDate}</td>
                <td
                  style={{
                    color:
                      item.status === "Present"
                        ? "lightgreen"
                        : "tomato",
                    fontWeight: "bold",
                  }}
                >
                  {item.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Attendance Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MyAttendance;