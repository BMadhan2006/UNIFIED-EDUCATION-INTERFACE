import { useEffect, useState } from "react";
import api from "../services/api";

function MyAssignments() {
  const [assignments, setAssignments] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      const response = await api.get("/assignments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAssignments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#1b1d24",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        📝 My Assignments
      </h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Assignment Title</th>
            <th>Course</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {assignments.length > 0 ? (
            assignments.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.assignmentTitle}</td>
                <td>{a.courseName}</td>
                <td>{a.description}</td>
                <td>{a.dueDate}</td>
                <td>{a.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Assignments Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MyAssignments;