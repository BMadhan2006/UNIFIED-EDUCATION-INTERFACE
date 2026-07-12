import { useEffect, useState } from "react";
import api from "../services/api";

function RecentActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setActivities(response.data.reverse().slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "30px",
        boxShadow: "0 4px 10px rgba(17,179,162,0.1)",
      }}
    >
      <h2>Recent Activities</h2>

      {activities.length > 0 ? (
        activities.map((activity) => (
          <div
            key={activity.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#2563EB",
                marginRight: "15px",
              }}
            ></div>

            <div style={{ flex: 1 }}>
              <strong>{activity.title}</strong>

              <p
                style={{
                  margin: 0,
                  color: "#6B7280",
                  fontSize: "14px",
                }}
              >
                {activity.message}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No recent activities.</p>
      )}
    </div>
  );
}

export default RecentActivity;