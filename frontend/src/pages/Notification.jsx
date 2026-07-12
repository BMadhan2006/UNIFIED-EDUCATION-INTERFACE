import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
function Notification() {

  const [notifications, setNotifications] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [notification, setNotification] = useState({
    notificationId: "",
    title: "",
    message: "",
    recipientType: "",
    department: "",
    date: "",
    priority: "",
  });

  const token = localStorage.getItem("token");

  const loadNotifications = async () => {
  try {
    setLoading(true);

    const response = await api.get("/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotifications(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleChange = (e) => {
    setNotification({
      ...notification,
      [e.target.name]: e.target.value,
    });
  };

  const addNotification = async () => {

    try {

      await api.post("/notifications", notification, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Notification Added Successfully");

      setNotification({
        notificationId: "",
        title: "",
        message: "",
        recipientType: "",
        department: "",
        date: "",
        priority: "",
      });

      loadNotifications();

    } catch (error) {

      console.log(error);
      alert("Failed");

    }

  };

  const updateNotification = async () => {

    try {

      await api.put(`/notifications/${editingId}`, notification, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Notification Updated Successfully");

      setEditingId(null);

      setNotification({
        notificationId: "",
        title: "",
        message: "",
        recipientType: "",
        department: "",
        date: "",
        priority: "",
      });

      loadNotifications();

    } catch (error) {

      console.log(error);
      alert("Update Failed");

    }

  };

  const deleteNotification = async (id) => {

    if (!window.confirm("Delete this Notification?")) return;

    try {

      await api.delete(`/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Deleted Successfully");

      loadNotifications();

    } catch (error) {

      console.log(error);
      alert("Delete Failed");

    }

  };
  const exportCSV = () => {
  const headers = [
    "Title",
    "Message",
    "Date",
  ];

  const rows = notifications.map((n) => [
    n.title,
    n.message,
    n.date,
  ]);

  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "notifications.csv";
  link.click();
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
  Notification Management
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
          name="notificationId"
          placeholder="Notification ID"
          value={notification.notificationId}
          onChange={handleChange}
        />

        <input
          name="title"
          placeholder="Title"
          value={notification.title}
          onChange={handleChange}
        />

        <input
          name="message"
          placeholder="Message"
          value={notification.message}
          onChange={handleChange}
        />

        <input
          name="recipientType"
          placeholder="Recipient Type"
          value={notification.recipientType}
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          value={notification.department}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={notification.date}
          onChange={handleChange}
        />

        <input
          name="priority"
          placeholder="Priority"
          value={notification.priority}
          onChange={handleChange}
        />

      </div>

     <button
  onClick={editingId ? updateNotification : addNotification}
  style={{
    padding: "10px 20px",
    marginBottom: "30px",
    cursor: "pointer",
  }}
>
  {editingId ? "Update Notification" : "Add Notification"}
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
          marginTop: "30px",
        }}
      >
        <thead>
          <tr>
           
            <th>Notification ID</th>
            <th>Title</th>
            <th>Message</th>
            <th>Recipient</th>
            <th>Department</th>
            <th>Date</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {notifications.map((n) => (
            <tr key={n.id}>
             
              <td>{n.notificationId}</td>
              <td>{n.title}</td>
              <td>{n.message}</td>
              <td>{n.recipientType}</td>
              <td>{n.department}</td>
              <td>{n.date}</td>
              <td>{n.priority}</td>

              <td>
                <button
                  onClick={() => {
                    setNotification(n);
                    setEditingId(n.id);
                  }}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteNotification(n.id)}
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

export default Notification;