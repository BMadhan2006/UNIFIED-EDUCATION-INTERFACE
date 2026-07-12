import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      console.log(response.data);
      localStorage.setItem("token", response.data.token);
localStorage.setItem("role", response.data.role);
localStorage.setItem("username", username);
console.log("Saved username:", username);
console.log("LocalStorage username:", localStorage.getItem("username"));
alert("Login Successful!");

if (response.data.role === "ADMIN") {
    navigate("/dashboard");
} else if (response.data.role === "TEACHER") {
    navigate("/teacher-dashboard");
} else if (response.data.role === "STUDENT") {
    navigate("/student-dashboard");
}
    } catch (error) {
      console.log("Login Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);

        alert(error.response.data.message || "Login Failed");
      } else {
        alert("Cannot connect to backend");
      }
    }
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "100px auto",
        textAlign: "center",
      }}
    >
      <h1>Unified Education Interface</h1>

      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
      <button
  onClick={() => navigate("/admissions")}
  style={{
    width: "100%",
    marginTop: "15px",
    padding: "10px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  }}
>
    🎓 Admissions Open - Apply Now
</button>
    </div>
  );
}

export default Login;