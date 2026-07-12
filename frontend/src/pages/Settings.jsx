import { useState } from "react";
import Footer from "../components/Footer";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  console.log(localStorage.getItem("username"));
  return (
    <div
      style={{
        padding: "30px",
        background: darkMode ? "#1f2937" : "#f3f4f6",
        minHeight: "100vh",
        color: darkMode ? "white" : "black",
      }}
    >
      <h1>⚙️ Settings</h1>

      {/* Administrator */}
      <div
        style={{
          background: darkMode ? "#374151" : "white",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "25px",
          boxShadow: "0 4px 10px rgba(0,0,0,.15)",
        }}
      >
        <h2>Administrator</h2>

        <p>
          <strong>Name:</strong>{" "}
          {localStorage.getItem("username") || "Not Available"}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {localStorage.getItem("role") || "Administrator"}
        </p>

        <p>
          <strong>Project:</strong> Unified Education Interface
        </p>

        <p>
          <strong>Version:</strong> 1.0
        </p>
      </div>

      {/* Appearance */}
      <div
        style={{
          background: darkMode ? "#374151" : "white",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,.15)",
        }}
      >
        <h2>Appearance</h2>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Change Password */}
      <div
        style={{
          background: darkMode ? "#374151" : "white",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,.15)",
        }}
      >
        <h2>Change Password</h2>

        <input
          type="password"
          placeholder="New Password"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button
          style={{
            padding: "10px 20px",
            background: "#2563EB",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Update Password
        </button>
      </div>

      {/* System Information */}
      <div
        style={{
          background: darkMode ? "#374151" : "white",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,.15)",
        }}
      >
        <h2>System Information</h2>

        <p>Frontend: React + Vite</p>
        <p>Backend: Spring Boot</p>
        <p>Database: MySQL + MongoDB</p>
      </div>

      <Footer />
    </div>
  );
}

export default Settings;