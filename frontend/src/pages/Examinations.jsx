import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
function Examinations() {
  const [examinations, setExaminations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState({
    examId: "",
    examName: "",
    courseCode: "",
    courseName: "",
    examDate: "",
    examTime: "",
    examHall: "",
    semester: "",
    department: "",
  });

  const token = localStorage.getItem("token");

  const loadExaminations = async () => {
    try {
      setLoading(true);
      const response = await api.get("/examinations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExaminations(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExaminations();
  }, []);

  const handleChange = (e) => {
    setExam({
      ...exam,
      [e.target.name]: e.target.value,
    });
  };

  const addExamination = async () => {
    try {
      await api.post("/examinations", exam, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Examination Added Successfully");

      setExam({
        examId: "",
        examName: "",
        courseCode: "",
        courseName: "",
        examDate: "",
        examTime: "",
        examHall: "",
        semester: "",
        department: "",
      });

      loadExaminations();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Examination");
    }
  };

  const updateExamination = async () => {
    if (!window.confirm("Update this examination record?")) return;
    try {
      await api.put(`/examinations/${editingId}`, exam, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Examination Updated Successfully");

      setEditingId(null);

      setExam({
        examId: "",
        examName: "",
        courseCode: "",
        courseName: "",
        examDate: "",
        examTime: "",
        examHall: "",
        semester: "",
        department: "",
      });

      loadExaminations();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  const deleteExamination = async (id) => {
    if (!window.confirm("Delete this examination?")) return;

    try {
      await api.delete(`/examinations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Examination Deleted Successfully");

      loadExaminations();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };
  const filteredExaminations = examinations.filter((e) =>
  (e.examId || "").toLowerCase().includes(search.toLowerCase()) ||
  (e.examName || "").toLowerCase().includes(search.toLowerCase()) ||
  (e.courseCode || "").toLowerCase().includes(search.toLowerCase()) ||
  (e.courseName || "").toLowerCase().includes(search.toLowerCase()) ||
  (e.examHall || "").toLowerCase().includes(search.toLowerCase()) ||
  (e.department || "").toLowerCase().includes(search.toLowerCase())
);
const exportCSV = () => {
  const headers = [
    "Exam ID",
    "Exam Name",
    "Course",
    "Date",
    "Time",
    "Hall",
  ];

  const rows = examinations.map((e) => [
    e.examId,
    e.examName,
    e.courseName,
    e.examDate,
    e.examTime,
    e.examHall,
  ]);

  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "examinations.csv";
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
  Examinations Management
</h1>
      <input
  type="text"
  placeholder="Search by Exam ID, Exam Name, Course, Hall or Department..."
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
          name="examId"
          placeholder="Exam ID"
          value={exam.examId}
          onChange={handleChange}
        />

        <input
          name="examName"
          placeholder="Exam Name"
          value={exam.examName}
          onChange={handleChange}
        />

        <input
          name="courseCode"
          placeholder="Course Code"
          value={exam.courseCode}
          onChange={handleChange}
        />

        <input
          name="courseName"
          placeholder="Course Name"
          value={exam.courseName}
          onChange={handleChange}
        />

        <input
          type="date"
          name="examDate"
          value={exam.examDate}
          onChange={handleChange}
        />

        <input
          type="time"
          name="examTime"
          value={exam.examTime}
          onChange={handleChange}
        />

        <input
          name="examHall"
          placeholder="Exam Hall"
          value={exam.examHall}
          onChange={handleChange}
        />

        <input
          type="number"
          name="semester"
          placeholder="Semester"
          value={exam.semester}
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          value={exam.department}
          onChange={handleChange}
        />
      </div>

      <button
  onClick={editingId ? updateExamination : addExamination}
  style={{
    padding: "10px 20px",
    marginBottom: "30px",
    cursor: "pointer",
  }}
>
  {editingId ? "Update Examination" : "Add Examination"}
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
            
            <th>Exam ID</th>
            <th>Exam Name</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Exam Date</th>
            <th>Exam Time</th>
            <th>Exam Hall</th>
            <th>Semester</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredExaminations.map((e) => (
            <tr key={e.id}>
             
              <td>{e.examId}</td>
              <td>{e.examName}</td>
              <td>{e.courseCode}</td>
              <td>{e.courseName}</td>
              <td>{e.examDate}</td>
              <td>{e.examTime}</td>
              <td>{e.examHall}</td>
              <td>{e.semester}</td>
              <td>{e.department}</td>

              <td>
                <button
                  onClick={() => {
                    setExam(e);
                    setEditingId(e.id);
                  }}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteExamination(e.id)}
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

export default Examinations;