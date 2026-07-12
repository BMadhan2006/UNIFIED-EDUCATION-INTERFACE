import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
function Fee() {

  const [fees, setFees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [fee, setFee] = useState({
    feeId: "",
    studentId: "",
    studentName: "",
    department: "",
    semester: "",
    totalFee: "",
    paidAmount: "",
    balanceAmount: "",
    paymentStatus: "",
  });

  const token = localStorage.getItem("token");

  const loadFees = async () => {
  try {
    setLoading(true);

    const response = await api.get("/fees", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setFees(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadFees();
  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;

    let updatedFee = {
      ...fee,
      [name]: value,
    };

    if (name === "totalFee" || name === "paidAmount") {

      const total = Number(
        name === "totalFee" ? value : updatedFee.totalFee
      );

      const paid = Number(
        name === "paidAmount" ? value : updatedFee.paidAmount
      );

      updatedFee.balanceAmount = total - paid;

      if (paid >= total && total > 0) {
        updatedFee.paymentStatus = "Paid";
      } else if (paid > 0) {
        updatedFee.paymentStatus = "Partial";
      } else {
        updatedFee.paymentStatus = "Pending";
      }
    }

    setFee(updatedFee);
  };

  const addFee = async () => {

    try {

      await api.post("/fees", fee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Fee Added Successfully");

      setFee({
        feeId: "",
        studentId: "",
        studentName: "",
        department: "",
        semester: "",
        totalFee: "",
        paidAmount: "",
        balanceAmount: "",
        paymentStatus: "",
      });

      loadFees();

    } catch (error) {

      console.log(error);
      alert("Failed");

    }

  };

  const updateFee = async () => {
    if (!window.confirm("Update this fee record?")) return;

    try {

      await api.put(`/fees/${editingId}`, fee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Updated Successfully");

      setEditingId(null);

      setFee({
        feeId: "",
        studentId: "",
        studentName: "",
        department: "",
        semester: "",
        totalFee: "",
        paidAmount: "",
        balanceAmount: "",
        paymentStatus: "",
      });

      loadFees();

    } catch (error) {

      console.log(error);
      alert("Update Failed");

    }

  };

  const deleteFee = async (id) => {

    if (!window.confirm("Delete this Fee?")) return;

    try {

      await api.delete(`/fees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Deleted Successfully");

      loadFees();

    } catch (error) {

      console.log(error);
      alert("Delete Failed");

    }

  };
 const filteredFees = fees.filter((f) =>
  (f.feeId || "").toLowerCase().includes(search.toLowerCase()) ||
  (f.studentId || "").toLowerCase().includes(search.toLowerCase()) ||
  (f.studentName || "").toLowerCase().includes(search.toLowerCase()) ||
  (f.department || "").toLowerCase().includes(search.toLowerCase()) ||
  (f.paymentStatus || "").toLowerCase().includes(search.toLowerCase())
);
const exportCSV = () => {
  const headers = [
    "Fee ID",
    "Student ID",
    "Student Name",
    "Department",
    "Semester",
    "Total Fee",
    "Paid",
    "Balance",
    "Status",
  ];

  const rows = fees.map((f) => [
    f.feeId,
    f.studentId,
    f.studentName,
    f.department,
    f.semester,
    f.totalFee,
    f.paidAmount,
    f.balanceAmount,
    f.paymentStatus,
  ]);

  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "fees.csv";
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
  Fee Management
</h1>
      <input
  type="text"
  placeholder="Search Fee..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    margin: "20px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  }}
/>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >

        <input name="feeId" placeholder="Fee ID" value={fee.feeId} onChange={handleChange} />

        <input name="studentId" placeholder="Student ID" value={fee.studentId} onChange={handleChange} />

        <input name="studentName" placeholder="Student Name" value={fee.studentName} onChange={handleChange} />

        <input name="department" placeholder="Department" value={fee.department} onChange={handleChange} />

        <input
          type="number"
          name="semester"
          placeholder="Semester"
          value={fee.semester}
          onChange={handleChange}
        />

        <input
          type="number"
          name="totalFee"
          placeholder="Total Fee"
          value={fee.totalFee}
          onChange={handleChange}
        />

        <input
          type="number"
          name="paidAmount"
          placeholder="Paid Amount"
          value={fee.paidAmount}
          onChange={handleChange}
        />

        <input
          type="number"
          name="balanceAmount"
          value={fee.balanceAmount}
          readOnly
        />

        <input
          name="paymentStatus"
          value={fee.paymentStatus}
          readOnly
        />

      </div>

      <button
  onClick={editingId ? updateFee : addFee}
  style={{
    padding: "10px 20px",
    marginBottom: "30px",
    cursor: "pointer",
  }}
>
  {editingId ? "Update Fee" : "Add Fee"}
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
            <th>Fee ID</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Total Fee</th>
            <th>Paid Amount</th>
            <th>Balance Amount</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredFees.map((f) => (
            <tr key={f.id}>
              <td>{f.feeId}</td>
              <td>{f.studentId}</td>
              <td>{f.studentName}</td>
              <td>{f.department}</td>
              <td>{f.semester}</td>
              <td>{f.totalFee}</td>
              <td>{f.paidAmount}</td>
              <td>{f.balanceAmount}</td>
              <td>{f.paymentStatus}</td>

              <td>
                <button
                  onClick={() => {
                    setFee(f);
                    setEditingId(f.id);
                  }}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteFee(f.id)}
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

export default Fee;