import { useEffect, useState } from "react";
import api from "../services/api";

function AnnouncementCard() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAnnouncements(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px",
        boxShadow: "0 4px 10px rgba(135, 25, 25, 0.1)",
      }}
    >
      <h2>Latest Announcements</h2>

      {announcements.length > 0 ? (
        announcements
          .slice()
          .reverse()
          .slice(0, 5)
          .map((item) => (
            <div
              key={item.id}
              style={{
                padding: "15px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <h3 style={{ marginBottom: "5px" }}>
                {item.title}
              </h3>

              <p style={{ color: "#1e1d1d" }}>
                {item.message}
              </p>
            </div>
          ))
      ) : (
        <p>No announcements available.</p>
      )}
    </div>
  );
}

export default AnnouncementCard;