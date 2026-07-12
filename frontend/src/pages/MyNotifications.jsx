import { useEffect, useState } from "react";
import api from "../services/api";

function MyNotifications() {
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await api.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#1b1d24",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        🔔 My Notifications
      </h1>

      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              background: "#2b2d42",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>{notification.title}</h3>

            <p>{notification.message}</p>

            <small>{notification.createdAt}</small>
          </div>
        ))
      ) : (
        <h3>No Notifications Available</h3>
      )}
    </div>
  );
}

export default MyNotifications;