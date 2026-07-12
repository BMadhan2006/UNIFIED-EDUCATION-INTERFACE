import { useLocation, useNavigate } from "react-router-dom";

function AdmissionView() {
  const location = useLocation();
  const navigate = useNavigate();

  const admission = location.state;

  if (!admission) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>No Admission Details Found</h2>

        <button
          onClick={() => navigate("/admission-management")}
          style={{
            padding: "10px 20px",
            background: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>
        🎓 Admission Details
      </h1>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
        }}
      >
        <p><strong>Full Name:</strong> {admission.fullName}</p>

        <p><strong>Email:</strong> {admission.email}</p>

        <p><strong>Phone:</strong> {admission.phone}</p>

        <p><strong>Date of Birth:</strong> {admission.dob}</p>

        <p><strong>Gender:</strong> {admission.gender}</p>

        <p><strong>Course:</strong> {admission.course}</p>

        <p><strong>10th Percentage:</strong> {admission.tenthMark}</p>

        <p><strong>12th Percentage:</strong> {admission.twelfthMark}</p>

        <p><strong>Address:</strong> {admission.address}</p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            style={{
              color:
                admission.status === "Approved"
                  ? "green"
                  : admission.status === "Rejected"
                  ? "red"
                  : "orange",
              fontWeight: "bold",
            }}
          >
            {admission.status}
          </span>
        </p>

        <button
          onClick={() => navigate("/admission-management")}
          style={{
            marginTop: "25px",
            padding: "12px 25px",
            background: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default AdmissionView;