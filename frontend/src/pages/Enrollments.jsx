import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);

  const [enrollment, setEnrollment] = useState({
    enrollmentId: "",
    studentId: "",
    studentName: "",
    courseCode: "",
    courseName: "",
    enrollmentDate: "",
    status: "",
  });

  const token = localStorage.getItem("token");

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      const response = await api.get("/enrollments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEnrollments(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnrollments();
  }, []);

  const handleChange = (e) => {
    setEnrollment({
      ...enrollment,
      [e.target.name]: e.target.value,
    });
  };

  const addEnrollment = async () => {
    try {
      await api.post("/enrollments", enrollment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Enrollment Added Successfully");

      setEnrollment({
        enrollmentId: "",
        studentId: "",
        studentName: "",
        courseCode: "",
        courseName: "",
        enrollmentDate: "",
        status: "",
      });

      loadEnrollments();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Enrollment");
    }
  };

  const updateEnrollment = async () => {
    try {
      await api.put(`/enrollments/${editingId}`, enrollment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Enrollment Updated Successfully");

      setEditingId(null);

      setEnrollment({
        enrollmentId: "",
        studentId: "",
        studentName: "",
        courseCode: "",
        courseName: "",
        enrollmentDate: "",
        status: "",
      });

      loadEnrollments();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  const deleteEnrollment = async (id) => {
  if (!window.confirm("Delete this enrollment?")) return;

  try {
    await api.delete(`/enrollments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Enrollment Deleted Successfully");

    loadEnrollments();
  } catch (error) {
    console.log(error);
    alert("Delete Failed");
  }
};

const filteredEnrollments = enrollments.filter((e) =>
  (e.enrollmentId || "").toLowerCase().includes(search.toLowerCase()) ||
  (e.studentId || "").toLowerCase().includes(search.toLowerCase()) ||
  (e.studentName || "").toLowerCase().includes(search.toLowerCase()) ||
  (e.courseCode || "").toLowerCase().includes(search.toLowerCase()) ||
  (e.courseName || "").toLowerCase().includes(search.toLowerCase()) ||
  (e.status || "").toLowerCase().includes(search.toLowerCase())
);

const exportCSV = () => {
  const headers = [
    "Enrollment ID",
    "Student ID",
    "Student Name",
    "Course",
    "Semester",
  ];

  const rows = enrollments.map((e) => [
    e.enrollmentId,
    e.studentId,
    e.studentName,
    e.courseName,
    e.semester,
  ]);

  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "enrollments.csv";
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
  Enrollment Management
</h1>
      <input
  type="text"
  placeholder="Search by Enrollment ID, Student, Course or Status..."
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
          name="enrollmentId"
          placeholder="Enrollment ID"
          value={enrollment.enrollmentId}
          onChange={handleChange}
        />

        <input
          name="studentId"
          placeholder="Student ID"
          value={enrollment.studentId}
          onChange={handleChange}
        />

        <input
          name="studentName"
          placeholder="Student Name"
          value={enrollment.studentName}
          onChange={handleChange}
        />

        <input
          name="courseCode"
          placeholder="Course Code"
          value={enrollment.courseCode}
          onChange={handleChange}
        />

        <input
          name="courseName"
          placeholder="Course Name"
          value={enrollment.courseName}
          onChange={handleChange}
        />

        <input
          type="date"
          name="enrollmentDate"
          value={enrollment.enrollmentDate}
          onChange={handleChange}
        />

        <input
          name="status"
          placeholder="Status"
          value={enrollment.status}
          onChange={handleChange}
        />
      </div>

      <button
  onClick={editingId ? updateEnrollment : addEnrollment}
  style={{
    padding: "10px 20px",
    marginBottom: "30px",
    cursor: "pointer",
  }}
>
  {editingId ? "Update Enrollment" : "Add Enrollment"}
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
           
            <th>Enrollment ID</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Enrollment Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
{filteredEnrollments.map((e) => (
              <tr key={e.id}>
            
              <td>{e.enrollmentId}</td>
              <td>{e.studentId}</td>
              <td>{e.studentName}</td>
              <td>{e.courseCode}</td>
              <td>{e.courseName}</td>
              <td>{e.enrollmentDate}</td>
              <td>{e.status}</td>

              <td>
                <button
                  onClick={() => {
                    setEnrollment(e);
                    setEditingId(e.id);
                  }}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteEnrollment(e.id)}
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

export default Enrollments;