import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function TeacherDashboard() {
  const navigate = useNavigate();

  const cardStyle = {
    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
    color: "white",
    padding: "25px",
    borderRadius: "15px",
    width: "240px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "0.3s",
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ marginLeft: "250px", width: "100%" }}>
        <Navbar />

        <div style={{ padding: "30px" }}>
          <h1>Teacher Dashboard</h1>

          <p
            style={{
              color: "#6B7280",
              fontSize: "18px",
              marginBottom: "30px",
            }}
          >
            Welcome to the Unified Education Interface Teacher Portal
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "25px",
            }}
          >
            <div
              style={cardStyle}
              onClick={() => navigate("/teacher-courses")}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-8px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0px)")
              }
            >
              <h2>📚 My Courses</h2>
              <p>View and manage assigned courses</p>
            </div>

            <div
              style={cardStyle}
              onClick={() => navigate("/teacher-timetable")}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-8px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0px)")
              }
            >
              <h2>📅 Timetable</h2>
              <p>View your teaching schedule</p>
            </div>

            <div
              style={cardStyle}
              onClick={() => navigate("/teacher-attendance")}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-8px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0px)")
              }
            >
              <h2>✅ Attendance</h2>
              <p>Manage student attendance</p>
            </div>

            <div
              style={cardStyle}
              onClick={() => navigate("/teacher-marks")}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-8px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0px)")
              }
            >
              <h2>📊 Marks</h2>
              <p>Enter and update marks</p>
            </div>

            <div
              style={cardStyle}
              onClick={() => navigate("/teacher-assignments")}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-8px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0px)")
              }
            >
              <h2>📝 Assignments</h2>
              <p>Create and manage assignments</p>
            </div>

            <div
              style={cardStyle}
              onClick={() => navigate("/teacher-notifications")}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-8px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0px)")
              }
            >
              <h2>🔔 Notifications</h2>
              <p>View important announcements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;