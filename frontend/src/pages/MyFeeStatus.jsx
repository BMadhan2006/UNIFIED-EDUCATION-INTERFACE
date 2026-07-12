import { useEffect, useState } from "react";
import api from "../services/api";

function MyFeeStatus() {
  const [fees, setFees] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadFees();
  }, []);

  const loadFees = async () => {
    try {
      const response = await api.get("/fees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFees(response.data);
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
        💰 My Fee Status
      </h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Total Fee</th>
            <th>Paid</th>
            <th>Pending</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {fees.length > 0 ? (
            fees.map((fee) => (
              <tr key={fee.id}>
                <td>{fee.id}</td>
                <td>{fee.studentName}</td>
                <td>{fee.totalFee}</td>
                <td>{fee.paidAmount}</td>
                <td>{fee.pendingAmount}</td>
                <td>{fee.paymentStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Fee Records</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MyFeeStatus;