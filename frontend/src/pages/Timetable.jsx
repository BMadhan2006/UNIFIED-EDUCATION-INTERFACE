import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
function Timetable() {

  const [timetables, setTimetables] = useState([]);
  const [editingId, setEditingId] = useState(null);
 const [loading, setLoading] = useState(true);
  const [timetable, setTimetable] = useState({
    timetableId: "",
    courseCode: "",
    courseName: "",
    teacherName: "",
    department: "",
    semester: "",
    day: "",
    startTime: "",
    endTime: "",
    classroom: "",
  });

  const token = localStorage.getItem("token");

  const loadTimetables = async () => {
  try {
    setLoading(true);

    const response = await api.get("/timetable", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTimetables(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadTimetables();
  }, []);

  const handleChange = (e) => {
    setTimetable({
      ...timetable,
      [e.target.name]: e.target.value,
    });
  };

  const addTimetable = async () => {

    try {

      await api.post("/timetable", timetable, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Timetable Added Successfully");

      setTimetable({
        timetableId: "",
        courseCode: "",
        courseName: "",
        teacherName: "",
        department: "",
        semester: "",
        day: "",
        startTime: "",
        endTime: "",
        classroom: "",
      });

      loadTimetables();

    } catch (error) {

      console.log(error);
      alert("Failed");

    }

  };

  const updateTimetable = async () => {

    try {

      await api.put(`/timetable/${editingId}`, timetable, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Updated Successfully");

      setEditingId(null);

      setTimetable({
        timetableId: "",
        courseCode: "",
        courseName: "",
        teacherName: "",
        department: "",
        semester: "",
        day: "",
        startTime: "",
        endTime: "",
        classroom: "",
      });

      loadTimetables();

    } catch (error) {

      console.log(error);
      alert("Update Failed");

    }

  };

  const deleteTimetable = async (id) => {

    if (!window.confirm("Delete this timetable?")) return;

    try {

      await api.delete(`/timetable/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Deleted Successfully");

      loadTimetables();

    } catch (error) {

      console.log(error);
      alert("Delete Failed");

    }

  };
  const exportCSV = () => {
  const headers = [
    "Subject",
    "Department",
    "Semester",
    "Day",
    "Time",
    "Faculty",
    "Room",
  ];

  const rows = timetables.map((t) => [
    t.subject,
    t.department,
    t.semester,
    t.day,
    t.time,
    t.faculty,
    t.room,
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
  link.setAttribute("download", "timetable.csv");
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
  Timetable Management
</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >

        <input
          name="timetableId"
          placeholder="Timetable ID"
          value={timetable.timetableId}
          onChange={handleChange}
        />

        <input
          name="courseCode"
          placeholder="Course Code"
          value={timetable.courseCode}
          onChange={handleChange}
        />

        <input
          name="courseName"
          placeholder="Course Name"
          value={timetable.courseName}
          onChange={handleChange}
        />

        <input
          name="teacherName"
          placeholder="Teacher Name"
          value={timetable.teacherName}
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          value={timetable.department}
          onChange={handleChange}
        />

        <input
          type="number"
          name="semester"
          placeholder="Semester"
          value={timetable.semester}
          onChange={handleChange}
        />

        <input
          name="day"
          placeholder="Day"
          value={timetable.day}
          onChange={handleChange}
        />

        <input
          type="time"
          name="startTime"
          value={timetable.startTime}
          onChange={handleChange}
        />

        <input
          type="time"
          name="endTime"
          value={timetable.endTime}
          onChange={handleChange}
        />

        <input
          name="classroom"
          placeholder="Classroom"
          value={timetable.classroom}
          onChange={handleChange}
        />

      </div>

      <button
  onClick={editingId ? updateTimetable : addTimetable}
  style={{
    padding: "10px 20px",
    marginBottom: "30px",
    cursor: "pointer",
  }}
>
  {editingId ? "Update Timetable" : "Add Timetable"}
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
        
            <th>Timetable ID</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Teacher Name</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Classroom</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {timetables.map((t) => (
            <tr key={t.id}>
              
              <td>{t.timetableId}</td>
              <td>{t.courseCode}</td>
              <td>{t.courseName}</td>
              <td>{t.teacherName}</td>
              <td>{t.department}</td>
              <td>{t.semester}</td>
              <td>{t.day}</td>
              <td>{t.startTime}</td>
              <td>{t.endTime}</td>
              <td>{t.classroom}</td>

              <td>
                <button
                  onClick={() => {
                    setTimetable(t);
                    setEditingId(t.id);
                  }}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTimetable(t.id)}
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

export default Timetable;