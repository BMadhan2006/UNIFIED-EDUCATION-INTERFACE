import { useEffect, useState } from "react";
import api from "../services/api";

function TeacherTimetable() {
  const [timetable, setTimetable] = useState([]);
  const [search, setSearch] = useState("");

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
    }
  };

  const filteredTimetable = timetable.filter(
    (t) =>
      (t.day || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.courseName || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.classroom || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>📅 Teacher Timetable</h1>

      <p
        style={{
          color: "#6B7280",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      >
        View your teaching schedule and classroom assignments.
      </p>

      <input
        type="text"
        placeholder="Search by Day, Course or Room..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead
          style={{
            background: "#2563EB",
            color: "white",
          }}
        >
          <tr>
            <th>Day</th>
            <th>Course</th>
            <th>Time</th>
            <th>Room</th>
          </tr>
        </thead>

        <tbody>
          {filteredTimetable.length > 0 ? (
            filteredTimetable.map((t) => (
              <tr key={t.id}>
                <td>{t.day}</td>
                <td>{t.courseName}</td>
                <td>
                  {t.startTime} - {t.endTime}
                </td>
                <td>{t.classroom}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{
                  padding: "20px",
                  fontWeight: "bold",
                  color: "gray",
                }}
              >
                No Timetable Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherTimetable;