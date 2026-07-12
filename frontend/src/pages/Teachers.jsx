import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import Loading from "../components/Loading";


function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);
  const [teacher, setTeacher] = useState({
    teacherId: "",
    fullName: "",
    email: "",
    phone: "",
    department: "",
    qualification: "",
    specialization: "",
  });

  const token = localStorage.getItem("token");

  const loadTeachers = async () => {
    try {
      const response = await api.get("/teachers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTeachers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const handleChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  const addTeacher = async () => {
    try {
      await api.post("/teachers", teacher, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Teacher Added Successfully");

      setTeacher({
        teacherId: "",
        fullName: "",
        email: "",
        phone: "",
        department: "",
        qualification: "",
        specialization: "",
      });

      loadTeachers();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Teacher");
    }
  };

  const updateTeacher = async () => {
    if (!window.confirm("Update this teacher record?")) return;
    try {
      await api.put(`/teachers/${editingId}`, teacher, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Teacher Updated Successfully");

      setEditingId(null);

      setTeacher({
        teacherId: "",
        fullName: "",
        email: "",
        phone: "",
        department: "",
        qualification: "",
        specialization: "",
      });

      loadTeachers();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  const deleteTeacher = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;

    try {
      await api.delete(`/teachers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Teacher Deleted Successfully");

      loadTeachers();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };
const filteredTeachers = teachers.filter((t) =>
  t.teacherId.toLowerCase().includes(search.toLowerCase()) ||
  t.fullName.toLowerCase().includes(search.toLowerCase()) ||
  t.department.toLowerCase().includes(search.toLowerCase())
);
const exportCSV = () => {
  const headers = [
    "Teacher ID",
    "Teacher Name",
    "Department",
    "Qualification",
    "Email",
    "Phone",
  ];

  const rows = teachers.map((teacher) => [
    teacher.teacherId,
    teacher.fullName,
    teacher.department,
    teacher.qualification,
    teacher.email,
    teacher.phone,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "teachers.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
  Teacher Management
</h1>
      <input
  type="text"
  placeholder="Search by Course ID, Name or Department..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    margin: "20px 0",
    borderRadius: "6px",
    border: "1px solid #cccccc",
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
          name="teacherId"
          placeholder="Teacher ID"
          value={teacher.teacherId}
          onChange={handleChange}
        />

        <input
          name="fullName"
          placeholder="Full Name"
          value={teacher.fullName}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={teacher.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={teacher.phone}
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          value={teacher.department}
          onChange={handleChange}
        />

        <input
          name="qualification"
          placeholder="Qualification"
          value={teacher.qualification}
          onChange={handleChange}
        />

        <input
          name="specialization"
          placeholder="Specialization"
          value={teacher.specialization}
          onChange={handleChange}
        />
      </div>
      

      <button
        onClick={editingId ? updateTeacher : addTeacher}
        style={{
          padding: "10px 20px",
          marginBottom: "30px",
          cursor: "pointer",
        }}
      >
        {editingId ? "Update Teacher" : "Add Teacher"}
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
         
            <th>Teacher ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Qualification</th>
            <th>Specialization</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredTeachers.map((t) => (
            <tr key={t.id}>
              
              <td>{t.teacherId}</td>
              <td>{t.fullName}</td>
              <td>{t.email}</td>
              <td>{t.phone}</td>
              <td>{t.department}</td>
              <td>{t.qualification}</td>
              <td>{t.specialization}</td>

              <td>
                <button
                  onClick={() => {
                    setTeacher(t);
                    setEditingId(t.id);
                  }}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTeacher(t.id)}
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
  export default Teachers;

