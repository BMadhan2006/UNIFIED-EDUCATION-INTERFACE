import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import { saveAs } from "file-saver";
import Loading from "../components/Loading";
function Students() {
  const [students, setStudents] = useState([]);
const [editingId, setEditingId] = useState(null);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);
  

  const [student, setStudent] = useState({
    studentId: "",
    fullName: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    semester: "",
    address: "",
  });

  const token = localStorage.getItem("token");

 const loadStudents = async () => {
  try {
    setLoading(true);

    const response = await api.get("/students", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setStudents(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const addStudent = async () => {
    try {
      await api.post("/students", student, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Student Added Successfully");

      setStudent({
        studentId: "",
        fullName: "",
        email: "",
        phone: "",
        department: "",
        year: "",
        semester: "",
        address: "",
      });

      loadStudents();
    } catch (error) {
      console.log("Add Error:", error);
      alert("Failed to Add Student");
    }
  };
  const updateStudent = async () => {
    if (!window.confirm("Update this student record?")) return;
  try {
    await api.put(`/students/${editingId}`, student, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Student Updated Successfully");

    setEditingId(null);

    setStudent({
      studentId: "",
      fullName: "",
      email: "",
      phone: "",
      department: "",
      year: "",
      semester: "",
      address: "",
    });

    loadStudents();
  } catch (error) {
    console.log(error);
    alert("Update Failed");
  }
};
const deleteStudent = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this student?");

  if (!confirmDelete) return;

  try {
    await api.delete(`/students/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Student Deleted Successfully");

    loadStudents();
  } catch (error) {
    console.log(error);
    alert("Delete Failed");
  }
};
const filteredStudents = students.filter((s) =>
  s.studentId.toLowerCase().includes(search.toLowerCase()) ||
  s.fullName.toLowerCase().includes(search.toLowerCase()) ||
  s.department.toLowerCase().includes(search.toLowerCase()) ||
  s.email.toLowerCase().includes(search.toLowerCase())
);
const exportCSV = () => {
  let csv = "Student ID,Name,Department,Year,Semester\n";

  students.forEach((s) => {
    csv += `${s.studentId},${s.fullName},${s.department},${s.year},${s.semester}\n`;
  });

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "students.csv");
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
  Student Management
</h1>
      <input
  type="text"
  placeholder="Search by Student ID, Name, Department or Email..."
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
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={student.studentId}
          onChange={handleChange}
        />

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={student.fullName}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={student.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={student.department}
          onChange={handleChange}
        />

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={student.year}
          onChange={handleChange}
        />

        <input
          type="number"
          name="semester"
          placeholder="Semester"
          value={student.semester}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={student.address}
          onChange={handleChange}
        />
      </div>
<button
  onClick={editingId ? updateStudent : addStudent}
  
  style={{
    padding: "10px 20px",
    marginBottom: "30px",
    cursor: "pointer",
  }}
>
  {editingId ? "Update Student" : "Add Student"}
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
           
            <th>Student ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Year</th>
            <th>Semester</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        
 <tbody>
  {filteredStudents.length > 0 ? (
    filteredStudents.map((s) => (
      <tr key={s.id}>
       
        <td>{s.studentId}</td>
        <td>{s.fullName}</td>
        <td>{s.email}</td>
        <td>{s.phone}</td>
  <td>{s.department}</td>
<td>{s.year}</td>
<td>{s.semester}</td>
<td>{s.address}</td>

<td>
  <button
    onClick={() => {
      setStudent(s);
      setEditingId(s.id);
    }}
    style={{ marginRight: "10px" }}
  >
    Edit
  </button>

  <button
    onClick={() => deleteStudent(s.id)}
    style={{
      background: "red",
      color: "white",
    }}
  >
    Delete
  </button>
</td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="8"
        style={{
          textAlign: "center",
          padding: "20px",
          fontWeight: "bold",
          color: "gray",
        }}
      >
        No Students Found
      </td>
    </tr>
  )}
</tbody>
        <tbody>
        </tbody>
      </table>
      <Footer/>
    </div>
   
  );
}

export default Students;