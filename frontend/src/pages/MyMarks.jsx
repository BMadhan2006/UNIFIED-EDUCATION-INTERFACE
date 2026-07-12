import { useEffect, useState } from "react";
import api from "../services/api";

function MyMarks() {
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

  const average =
    marks.length > 0
      ? (
          marks.reduce((sum, m) => sum + m.totalMarks, 0) /
          marks.length
        ).toFixed(2)
      : 0;

  return (
    <div
      style={{
        padding: "30px",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        📊 My Marks
      </h1>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Average Marks : {average}
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
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
              <td>{m.id}</td>
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

export default MyMarks;