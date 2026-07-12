import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#f3f4f6",
      }}
    >
      <h1
        style={{
          fontSize: "120px",
          margin: 0,
          color: "#2563EB",
        }}
      >
        404
      </h1>

      <h2>Page Not Found</h2>

      <p style={{ color: "#6B7280" }}>
        The page you are looking for doesn't exist.
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          background: "#2563EB",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default NotFound;