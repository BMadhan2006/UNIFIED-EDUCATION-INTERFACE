import { useEffect, useState } from "react";
import api from "../services/api";

function MyTimetable() {
  const [timetable, setTimetable] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {
    try {
      const response = await api.get("/timetable", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTimetable(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load timetable");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        📅 My Timetable
      </h1>

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
            <th>ID</th>
            <th>Day</th>
            <th>Period</th>
            <th>Course</th>
            <th>Faculty</th>
            <th>Room</th>
          </tr>
        </thead>

        <tbody>
          {timetable.length > 0 ? (
            timetable.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.day}</td>
                <td>{item.startTime} - {item.endTime}</td>
                <td>{item.courseName}</td>
                <td>{item.teacherName}</td>
                      <td>{item.classroom}</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Timetable Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MyTimetable;