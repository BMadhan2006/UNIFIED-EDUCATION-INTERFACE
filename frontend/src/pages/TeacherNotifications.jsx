import { useEffect, useState } from "react";
import api from "../services/api";

function TeacherNotifications() {

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
    <div style={{ padding: "30px" }}>
      <h1>🔔 Teacher Notifications</h1>

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
            <th>Title</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {notifications.map((n) => (
            <tr key={n.id}>
              <td>{n.title}</td>
              <td>{n.message}</td>
              <td>{n.date}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default TeacherNotifications;