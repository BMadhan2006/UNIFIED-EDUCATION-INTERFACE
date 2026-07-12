import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
function Marks() {
  const [marksList, setMarksList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [marks, setMarks] = useState({
    marksId: "",
    studentId: "",
    studentName: "",
    courseCode: "",
    courseName: "",
    internalMarks: "",
    externalMarks: "",
    totalMarks: "",
    grade: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadMarks();
  }, []);

  const loadMarks = async () => {
  try {
    setLoading(true);

    const response = await api.get("/marks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMarksList(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = {
      ...marks,
      [name]: value,
    };

    const internal = Number(updated.internalMarks) || 0;
    const external = Number(updated.externalMarks) || 0;
    const total = internal + external;

    let grade = "";

    if (total >= 90) grade = "A+";
    else if (total >= 80) grade = "A";
    else if (total >= 70) grade = "B+";
    else if (total >= 60) grade = "B";
    else if (total >= 50) grade = "C";
    else grade = "Fail";

    updated.totalMarks = total;
    updated.grade = grade;

    setMarks(updated);
  };

  const addMarks = async () => {
    try {
      await api.post("/marks", marks, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Marks Added Successfully");

      setMarks({
        marksId: "",
        studentId: "",
        studentName: "",
        courseCode: "",
        courseName: "",
        internalMarks: "",
        externalMarks: "",
        totalMarks: "",
        grade: "",
      });

      loadMarks();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Marks");
    }
  };

  const updateMarks = async () => {
    if (!window.confirm("Update this marks record?")) return;
    try {
      await api.put(`/marks/${editingId}`, marks, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Marks Updated Successfully");

      setEditingId(null);

      setMarks({
        marksId: "",
        studentId: "",
        studentName: "",
        courseCode: "",
        courseName: "",
        internalMarks: "",
        externalMarks: "",
        totalMarks: "",
        grade: "",
      });

      loadMarks();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  const deleteMarks = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      await api.delete(`/marks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Marks Deleted Successfully");
      loadMarks();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const filteredMarks = marksList.filter((m) =>
    (m.studentId || "").toLowerCase().includes(search.toLowerCase()) ||
    (m.studentName || "").toLowerCase().includes(search.toLowerCase()) ||
    (m.courseCode || "").toLowerCase().includes(search.toLowerCase()) ||
    (m.courseName || "").toLowerCase().includes(search.toLowerCase()) ||
    (m.grade || "").toLowerCase().includes(search.toLowerCase())
  );
  const exportCSV = () => {
  const headers = [
    "Student ID",
    "Student Name",
    "Course",
    "Internal",
    "External",
    "Total",
    "Grade",
  ];

  const rows = marksList.map((m) => [
    m.studentId,
    m.studentName,
    m.courseName,
    m.internalMarks,
    m.externalMarks,
    m.totalMarks,
    m.grade,
  ]);

  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "marks.csv";
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
  Marks Management
</h1>

      <input
        type="text"
        placeholder="Search by Student ID, Name, Course or Grade..."
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
          name="marksId"
          placeholder="Marks ID"
          value={marks.marksId}
          onChange={handleChange}
        />

        <input
          name="studentId"
          placeholder="Student ID"
          value={marks.studentId}
          onChange={handleChange}
        />

        <input
          name="studentName"
          placeholder="Student Name"
          value={marks.studentName}
          onChange={handleChange}
        />

        <input
          name="courseCode"
          placeholder="Course Code"
          value={marks.courseCode}
          onChange={handleChange}
        />

        <input
          name="courseName"
          placeholder="Course Name"
          value={marks.courseName}
          onChange={handleChange}
        />

        <input
          type="number"
          name="internalMarks"
          placeholder="Internal Marks"
          value={marks.internalMarks}
          onChange={handleChange}
        />

        <input
          type="number"
          name="externalMarks"
          placeholder="External Marks"
          value={marks.externalMarks}
          onChange={handleChange}
        />

        <input
          type="number"
          name="totalMarks"
          placeholder="Total Marks"
          value={marks.totalMarks}
          readOnly
        />

        <input
          name="grade"
          placeholder="Grade"
          value={marks.grade}
          readOnly
        />
      </div>

      <button
  onClick={editingId ? updateMarks : addMarks}
  style={{
    padding: "10px 20px",
    marginBottom: "30px",
    cursor: "pointer",
  }}
>
  {editingId ? "Update Marks" : "Add Marks"}
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
          
            <th>Marks ID</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Internal</th>
            <th>External</th>
            <th>Total</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredMarks.map((m) => (
            <tr key={m.id}>
             
              <td>{m.marksId}</td>
              <td>{m.studentId}</td>
              <td>{m.studentName}</td>
              <td>{m.courseCode}</td>
              <td>{m.courseName}</td>
              <td>{m.internalMarks}</td>
              <td>{m.externalMarks}</td>
              <td>{m.totalMarks}</td>
              <td>{m.grade}</td>

              <td>
                <button
                  onClick={() => {
                    setMarks(m);
                    setEditingId(m.id);
                  }}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteMarks(m.id)}
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

export default Marks;