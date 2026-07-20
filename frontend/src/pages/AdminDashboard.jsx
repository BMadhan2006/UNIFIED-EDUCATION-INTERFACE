import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
function AdminDashboard() {
  const navigate = useNavigate();

  const cardStyle = {
    backgroundColor: "#3d1b86",
    color: "black",
    padding: "20px",
    borderRadius: "10px",
    width: "220px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 2px 10px gray",
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard</h1>

      <h2>Welcome Admin!</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={cardStyle}
          onClick={() => navigate("/students-dashboard")}
        >
          <h2>👨‍🎓 Manage Students</h2>
        </div>

        <div
          style={cardStyle}
          onClick={() => navigate("/teachers")}
        >
          <h2>👨‍🏫 Manage Teachers</h2>
        </div>

        <div
          style={cardStyle}
          onClick={() => navigate("/courses")}
        >
          <h2>📚 Manage Courses</h2>
        </div>

        <div
          style={cardStyle}
          onClick={() => navigate("/attendance")}
        >
          <h2>📅 Attendance</h2>
        </div>

        <div
          style={cardStyle}
          onClick={() => navigate("/marks")}
        >
          <h2>📊 Marks</h2>
        </div>

        <div
          style={cardStyle}
          onClick={() => navigate("/assignment")}
        >
          <h2>📝 Assignments</h2>
        </div>

        <div
          style={cardStyle}
          onClick={() => navigate("/fees")}
        >
          <h2>💰 Fees</h2>
        </div>

        <div
          style={cardStyle}
          onClick={() => navigate("/library")}
        >
          <h2>📖 Library</h2>
        </div>

        <div
          style={cardStyle}
          onClick={() => navigate("/notifications")}
        >
          <h2>🔔 Notifications</h2>
        </div>
        
      </div>
    </div>
  );
}

export default AdminDashboard;