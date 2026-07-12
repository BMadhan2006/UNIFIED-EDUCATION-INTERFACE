import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
function Attendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({
    attendanceId: "",
    studentId: "",
    studentName: "",
    courseCode: "",
    courseName: "",
    attendanceDate: "",
    status: "",
  });

  const token = localStorage.getItem("token");

  const loadAttendance = async () => {
  try {
    setLoading(true);

    const response = await api.get("/attendance", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setAttendanceList(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadAttendance();
  }, []);

  const handleChange = (e) => {
    setAttendance({
      ...attendance,
      [e.target.name]: e.target.value,
    });
  };

  const addAttendance = async () => {
    try {
      await api.post("/attendance", attendance, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Attendance Added Successfully");

      setAttendance({
        attendanceId: "",
        studentId: "",
        studentName: "",
        courseCode: "",
        courseName: "",
        attendanceDate: "",
        status: "",
      });

      loadAttendance();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Attendance");
    }
  };

  const updateAttendance = async () => {
    if (!window.confirm("Update this attendance record?")) return;
    try {
      await api.put(`/attendance/${editingId}`, attendance, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Attendance Updated Successfully");

      setEditingId(null);

      setAttendance({
        attendanceId: "",
        studentId: "",
        studentName: "",
        courseCode: "",
        courseName: "",
        attendanceDate: "",
        status: "",
      });

      loadAttendance();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  const deleteAttendance = async (id) => {
    if (!window.confirm("Delete this attendance record?")) return;

    try {
      await api.delete(`/attendance/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Attendance Deleted Successfully");

      loadAttendance();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };
  const filteredAttendance = attendanceList.filter((a) =>
  (a.attendanceId || "").toLowerCase().includes(search.toLowerCase()) ||
  (a.studentId || "").toLowerCase().includes(search.toLowerCase()) ||
  (a.studentName || "").toLowerCase().includes(search.toLowerCase()) ||
  (a.courseCode || "").toLowerCase().includes(search.toLowerCase()) ||
  (a.courseName || "").toLowerCase().includes(search.toLowerCase()) ||
  (a.status || "").toLowerCase().includes(search.toLowerCase())
);
const totalStudents = attendanceList.length;

const presentStudents = attendanceList.filter(
  (item) => item.status?.toLowerCase() === "present"
).length;

const absentStudents = attendanceList.filter(
  (item) => item.status?.toLowerCase() === "absent"
).length;

const attendancePercentage =
  totalStudents > 0
    ? ((presentStudents / totalStudents) * 100).toFixed(1)
    : 0;
const exportCSV = () => {
  const headers = [
    "Student ID",
    "Student Name",
    "Course",
    "Date",
    "Status",
  ];

  const rows = attendanceList.map((a) => [
    a.studentId,
    a.studentName,
    a.courseName,
    a.attendanceDate,
    a.status,
  ]);

  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "attendance.csv";
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
  Attendance Management
</h1>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "20px",
    marginBottom: "25px",
  }}
>
  <div
    style={{
      background: "#2563EB",
      color: "white",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h3>Total Students</h3>
    <h1>{totalStudents}</h1>
  </div>

  <div
    style={{
      background: "#16A34A",
      color: "white",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h3>Present</h3>
    <h1>{presentStudents}</h1>
  </div>

  <div
    style={{
      background: "#DC2626",
      color: "white",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h3>Absent</h3>
    <h1>{absentStudents}</h1>
  </div>

  <div
    style={{
      background: "#7C3AED",
      color: "white",
      padding: "20px",
      borderRadius: "12px",
    }}
  >
    <h3 style={{ textAlign: "center" }}>Attendance</h3>

    <div
      style={{
        background: "#E5E7EB",
        height: "12px",
        borderRadius: "20px",
        overflow: "hidden",
        marginTop: "15px",
      }}
    >
      <div
        style={{
          width: `${attendancePercentage}%`,
          height: "100%",
          background: "#22C55E",
        }}
      ></div>
    </div>

    <h2
      style={{
        textAlign: "center",
        marginTop: "15px",
      }}
    >
      {attendancePercentage}%
    </h2>
  </div>
</div>
      <input
  type="text"
  placeholder="Search Attendance..."
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
  name="attendanceId"
  placeholder="Attendance ID"
  value={attendance.attendanceId}
  onChange={handleChange}
  style={{
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    fontSize: "15px",
    outline: "none",
  }}
/>

        <input
  name="studentId"
  placeholder="Student ID"
  value={attendance.studentId}
  onChange={handleChange}
  style={{
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    fontSize: "15px",
    outline: "none",
  }}
/>
        <input
  name="studentName"
  placeholder="Student Name"
  value={attendance.studentName}
  onChange={handleChange}
  style={{
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    fontSize: "15px",
    outline: "none",
  }}
/>
        <input
  name="courseCode"
  placeholder="CourseCode"
  value={attendance.CourseCode}
  onChange={handleChange}
  style={{
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    fontSize: "15px",
    outline: "none",
  }}
/>

        <input
  name="courseName"
  placeholder="CourseName"
  value={attendance.CourseName}
  onChange={handleChange}
  style={{
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    fontSize: "15px",
    outline: "none",
  }}
/>
<input
  type="date"
  name="attendanceDate"
  value={attendance.attendanceDate}
  onChange={handleChange}
  style={{
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    fontSize: "15px",
  }}
/>
<select
  name="status"
  value={attendance.status}
  onChange={handleChange}
  style={{
    padding: "8px",
    borderRadius: "5px",
  }}
>
  <option value="">Select Status</option>
  <option value="Present">Present</option>
  <option value="Absent">Absent</option>
</select>
      </div>

    <button
  onClick={editingId ? updateAttendance : addAttendance}
  style={{
    padding: "12px 25px",
    background: editingId ? "#F59E0B" : "#10B981",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    marginBottom: "30px",
  }}
>
  {editingId ? "Update Attendance" : "Add Attendance"}
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
  style={{
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 5px 15px rgba(0,0,0,.1)",
  }}
>
      <thead
  style={{
    background: "#2563EB",
    color: "white",
  }}
>
          <tr>
         
            <th>Attendance ID</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Attendance Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredAttendance.map((a) => (
           <tr
  key={a.id}
  style={{
    background:
      filteredAttendance.indexOf(a) % 2 === 0
        ? "#FFFFFF"
        : "#F9FAFB",
    transition: "0.3s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#DBEAFE";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background =
      filteredAttendance.indexOf(a) % 2 === 0
        ? "#FFFFFF"
        : "#F9FAFB";
  }}
>
              
              <td>{a.attendanceId}</td>
              <td>{a.studentId}</td>
              <td
  style={{
    fontWeight: "600",
  }}
>
  {a.studentName}
</td>
              <td>{a.courseCode}</td>
              <td>{a.courseName}</td>
              <td>{a.attendanceDate}</td>
             <td>
  <span
    style={{
      background:
        a.status === "Present"
          ? "#16A34A"
          : "#DC2626",
      color: "white",
      padding: "6px 14px",
      borderRadius: "20px",
      fontWeight: "bold",
    }}
  >
    {a.status}
  </span>
</td>
              <td>
                <button
                  onClick={() => {
                    setAttendance(a);
                    setEditingId(a.id);
                  }}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteAttendance(a.id)}
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

export default Attendance;