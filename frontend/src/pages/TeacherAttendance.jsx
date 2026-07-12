import { useEffect, useState } from "react";
import api from "../services/api";

function TeacherAttendance() {

  const [attendance, setAttendance] = useState([]);

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
    <div style={{ padding: "30px" }}>
      <h1>✅ Student Attendance</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Course</th>
            <th>Attendance Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((a) => (
            <tr key={a.id}>
              <td>{a.studentId}</td>
              <td>{a.studentName}</td>
              <td>{a.courseName}</td>
              <td>{a.attendanceDate}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherAttendance;