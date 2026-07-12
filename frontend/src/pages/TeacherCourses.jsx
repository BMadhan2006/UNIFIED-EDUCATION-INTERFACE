import { useEffect, useState } from "react";
import api from "../services/api";

function TeacherCourses() {

  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {

      const response = await api.get("/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCourses(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>📚 My Courses</h1>

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
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Credits</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.courseCode}</td>
              <td>{course.courseName}</td>
              <td>{course.department}</td>
              <td>{course.semester}</td>
              <td>{course.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherCourses;