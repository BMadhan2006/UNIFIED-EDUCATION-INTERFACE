import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
function Assignment() {
  const [assignments, setAssignments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [assignment, setAssignment] = useState({
    assignmentId: "",
    title: "",
    courseCode: "",
    courseName: "",
    faculty: "",
    dueDate: "",
    status: "",
  });

  const token = localStorage.getItem("token");

  const loadAssignments = async () => {
  try {
    setLoading(true);

    const response = await api.get("/assignments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setAssignments(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadAssignments();
  }, []);

  const handleChange = (e) => {
    setAssignment({
      ...assignment,
      [e.target.name]: e.target.value,
    });
  };

  const addAssignment = async () => {
    try {
      await api.post("/assignments", assignment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Assignment Added Successfully");

      setAssignment({
        assignmentId: "",
        title: "",
        courseCode: "",
        courseName: "",
        faculty: "",
        dueDate: "",
        status: "",
      });

      loadAssignments();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Assignment");
    }
  };

  const updateAssignment = async () => {
    if (!window.confirm("Update this assignment record?")) return;
    try {
      await api.put(`/assignments/${editingId}`, assignment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Assignment Updated Successfully");

      setEditingId(null);

      setAssignment({
        assignmentId: "",
        title: "",
        courseCode: "",
        courseName: "",
        faculty: "",
        dueDate: "",
        status: "",
      });

      loadAssignments();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  const deleteAssignment = async (id) => {
    if (!window.confirm("Delete this assignment?")) return;

    try {
      await api.delete(`/assignments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Assignment Deleted Successfully");

      loadAssignments();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const filteredAssignments = assignments.filter((a) =>
    (a.assignmentId || "").toLowerCase().includes(search.toLowerCase()) ||
    (a.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (a.courseCode || "").toLowerCase().includes(search.toLowerCase()) ||
    (a.courseName || "").toLowerCase().includes(search.toLowerCase()) ||
    (a.faculty || "").toLowerCase().includes(search.toLowerCase()) ||
    (a.status || "").toLowerCase().includes(search.toLowerCase())
  );
const exportCSV = () => {
  const headers = [
    "Assignment ID",
    "Title",
    "Course",
    "Department",
    "Semester",
    "Due Date",
  ];

  const rows = assignments.map((a) => [
    a.assignmentId,
    a.title,
    a.courseName,
    a.department,
    a.semester,
    a.dueDate,
  ]);

  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "assignments.csv";
  link.click();
};
if (loading) {
  return <Loading />;
}
  return (
    <div style={{ padding: "30px" }}>
      <h1
  style={{
    color: "#111827",
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "20px",
  }}
>
  Assignment Management
</h1>

      <input
        type="text"
        placeholder="Search Assignment..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "20px 0",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          name="assignmentId"
          placeholder="Assignment ID"
          value={assignment.assignmentId}
          onChange={handleChange}
        />

        <input
          name="title"
          placeholder="Assignment Title"
          value={assignment.title}
          onChange={handleChange}
        />

        <input
          name="courseCode"
          placeholder="Course Code"
          value={assignment.courseCode}
          onChange={handleChange}
        />

        <input
          name="courseName"
          placeholder="Course Name"
          value={assignment.courseName}
          onChange={handleChange}
        />

        <input
          name="faculty"
          placeholder="Faculty"
          value={assignment.faculty}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dueDate"
          value={assignment.dueDate}
          onChange={handleChange}
        />

        <input
          name="status"
          placeholder="Status"
          value={assignment.status}
          onChange={handleChange}
        />
      </div>

<button
  onClick={editingId ? updateAssignment : addAssignment}
  style={{
    padding: "10px 20px",
    marginBottom: "30px",
    cursor: "pointer",
  }}
>
  {editingId ? "Update Assignment" : "Add Assignment"}
</button>

<button
  onClick={exportCSV}
  style={{
    padding: "10px 20px",
    marginLeft: "10px",
    marginBottom: "30px",
    cursor: "pointer",
    background: "green",
    color: "white",
  }}
>
  Export CSV
</button>

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
            
            <th>Assignment ID</th>
            <th>Title</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Faculty</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredAssignments.map((a) => (
            <tr key={a.id}>
            
              <td>{a.assignmentId}</td>
              <td>{a.title}</td>
              <td>{a.courseCode}</td>
              <td>{a.courseName}</td>
              <td>{a.faculty}</td>
              <td>{a.dueDate}</td>
              <td>{a.status}</td>

              <td>
                <button
                  onClick={() => {
                    setAssignment(a);
                    setEditingId(a.id);
                  }}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteAssignment(a.id)}
                  style={{
                    background: "red",
                    color: "white",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
}

export default Assignment;