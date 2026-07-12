import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const profileImage = localStorage.getItem("profileImage");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const displayRole =
    role === "ADMIN"
      ? "Administrator"
      : role === "TEACHER"
      ? "Teacher"
      : role === "STUDENT"
      ? "Student"
      : "User";

  const [notificationCount, setNotificationCount] = useState(0);

  const loadNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotificationCount(response.data.length);
    } catch (error) {
      console.log("Notification Error:", error);
    }
  };

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2>Unified Education Interface</h2>
      </div>

      <div className="navbar-right">

        {/* Notification Bell */}
        <div
          style={{
            position: "relative",
            cursor: "pointer",
            marginRight: "20px",
          }}
          onClick={() => navigate("/notifications")}
        >
          <FaBell className="icon" />

          {notificationCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-8px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                fontSize: "11px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {notificationCount}
            </span>
          )}
        </div>

        {/* Profile Image */}
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            onClick={() => navigate("/profile")}
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        ) : (
          <FaUserCircle
            className="icon"
            onClick={() => navigate("/profile")}
            style={{
              fontSize: "45px",
              cursor: "pointer",
            }}
          />
        )}

        {/* Username & Role */}
        <div className="profile" style={{ marginLeft: "12px" }}>
          <h4>{username || "Admin"}</h4>
          <p>{displayRole}</p>
        </div>

      </div>
    </div>
  );
}

export default Navbar;