import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
function Courses() {
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({
    courseCode: "",
    courseName: "",
    description: "",
    credits: "",
    semester: "",
    department: "",
    teacherName: "",
  });

  const token = localStorage.getItem("token");

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get("/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCourses(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const addCourse = async () => {
    try {
      await api.post("/courses", course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Course Added Successfully");

      setCourse({
        courseCode: "",
        courseName: "",
        description: "",
        credits: "",
        semester: "",
        department: "",
        teacherName: "",
      });

      loadCourses();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Course");
    }
  };

  const updateCourse = async () => {
    if (!window.confirm("Update this course record?")) return;
    try {
      await api.put(`/courses/${editingId}`, course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Course Updated Successfully");

      setEditingId(null);

      setCourse({
        courseCode: "",
        courseName: "",
        description: "",
        credits: "",
        semester: "",
        department: "",
        teacherName: "",
      });

      loadCourses();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await api.delete(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Course Deleted Successfully");

      loadCourses();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };
  const filteredCourses = courses.filter((c) =>
  c.courseCode.toLowerCase().includes(search.toLowerCase()) ||
  c.courseName.toLowerCase().includes(search.toLowerCase()) ||
  c.department.toLowerCase().includes(search.toLowerCase()) ||
  c.teacherName.toLowerCase().includes(search.toLowerCase())
);
const exportCSV = () => {
  const headers = [
    "Course Code",
    "Course Name",
    "Department",
    "Semester",
    "Credits",
  ];

  const rows = courses.map((course) => [
    course.courseCode,
    course.courseName,
    course.department,
    course.semester,
    course.credits,
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
  link.setAttribute("download", "courses.csv");
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
  Course Management
</h1>
      <input
  type="text"
  placeholder="Search by Course Code, Name or Department..."
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
          name="courseCode"
          placeholder="Course Code"
          value={course.courseCode}
          onChange={handleChange}
        />

        <input
          name="courseName"
          placeholder="Course Name"
          value={course.courseName}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          value={course.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="credits"
          placeholder="Credits"
          value={course.credits}
          onChange={handleChange}
        />

        <input
          type="number"
          name="semester"
          placeholder="Semester"
          value={course.semester}
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          value={course.department}
          onChange={handleChange}
        />

        <input
          name="teacherName"
          placeholder="Teacher Name"
          value={course.teacherName}
          onChange={handleChange}
        />
      </div>

      <button
  onClick={editingId ? updateCourse : addCourse}
  style={{
    padding: "10px 20px",
    marginBottom: "30px",
    cursor: "pointer",
  }}
>
  {editingId ? "Update Course" : "Add Course"}
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
          
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Description</th>
            <th>Credits</th>
            <th>Semester</th>
            <th>Department</th>
            <th>Teacher</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
{filteredCourses.map((c) => (
              <tr key={c.id}>
              
              <td>{c.courseCode}</td>
              <td>{c.courseName}</td>
              <td>{c.description}</td>
              <td>{c.credits}</td>
              <td>{c.semester}</td>
              <td>{c.department}</td>
              <td>{c.teacherName}</td>

              <td>
                <button
                  onClick={() => {
                    setCourse(c);
                    setEditingId(c.id);
                  }}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCourse(c.id)}
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

export default Courses;