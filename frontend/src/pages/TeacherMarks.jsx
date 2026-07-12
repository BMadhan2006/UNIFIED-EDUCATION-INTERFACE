import { useEffect, useState } from "react";
import api from "../services/api";

function TeacherMarks() {

  const [marks, setMarks] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadMarks();
  }, []);

  const loadMarks = async () => {
    try {

      const response = await api.get("/marks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMarks(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>📊 Student Marks</h1>

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
            <th>Internal</th>
            <th>External</th>
            <th>Total</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {marks.map((m) => (
            <tr key={m.id}>
              <td>{m.studentId}</td>
              <td>{m.studentName}</td>
              <td>{m.courseName}</td>
              <td>{m.internalMarks}</td>
              <td>{m.externalMarks}</td>
              <td>{m.totalMarks}</td>
              <td>{m.grade}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default TeacherMarks;