import { useEffect, useState } from "react";
import api from "../services/api";

function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await api.get("/courses");
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
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Credits</th>
            <th>Teacher</th>
          </tr>
        </thead>

        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.id}>
                <td>{course.courseCode}</td>
                <td>{course.courseName}</td>
                <td>{course.department}</td>
                <td>{course.semester}</td>
                <td>{course.credits}</td>
                <td>{course.teacherName || "Not Assigned"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No Courses Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MyCourses;