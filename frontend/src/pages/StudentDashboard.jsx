import React from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {

  const navigate = useNavigate();

  const cardStyle = {
    backgroundColor: "#52859b",
    padding: "20px",
    borderRadius: "10px",
    width: "220px",
    textAlign: "center",
    boxShadow: "0px 0px 10px gray",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Student Dashboard</h1>

      <h2>👨‍🎓 Welcome Student</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {/* My Courses */}
        <div
          style={cardStyle}
          onClick={() => navigate("/my-courses")}
        >
          <h2>📚 My Courses</h2>
        </div>

       <div
  style={cardStyle}
  onClick={() => navigate("/my-timetable")}
>
  <h2>📅 My Timetable</h2>
</div>

        <div
  style={cardStyle}
  onClick={() => navigate("/my-attendance")}
>
  <h2>✅ Attendance</h2>
</div>
        <div
  style={cardStyle}
  onClick={() => navigate("/my-marks")}
>
  <h2>📊 My Marks</h2>
</div>
<div
  style={cardStyle}
  onClick={() => navigate("/my-assignments")}
>
  <h2>📝 Assignments</h2>
</div>

       <div
  style={cardStyle}
  onClick={() => navigate("/my-fee-status")}
>
  <h2>💰 Fee Status</h2>
</div>
        <div
  style={cardStyle}
  onClick={() => navigate("/my-library")}
>
  <h2>📚 Library</h2>
</div>
        <div
  style={cardStyle}
  onClick={() => navigate("/my-notifications")}
>
  <h2>🔔 Notifications</h2>
</div>
      </div>
    </div>
  );
}

export default StudentDashboard;