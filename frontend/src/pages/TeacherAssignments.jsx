import { useEffect, useState } from "react";
import api from "../services/api";

function TeacherAssignments() {
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
    <div style={{ padding: "30px" }}>
      <h1>📝 Teacher Assignments</h1>

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
  <th>Assignment Title</th>
  <th>Course</th>
  <th>Due Date</th>
  <th>Status</th>
</tr>
        </thead>
<tbody>
  {assignments.map((a) => (
    <tr key={a.id}>
      <td>{a.assignmentTitle}</td>
      <td>{a.courseName}</td>
      <td>{a.dueDate}</td>
      <td>{a.status}</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}

export default TeacherAssignments;