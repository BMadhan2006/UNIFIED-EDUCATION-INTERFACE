import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

function Placement() {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [placementList, setPlacementList] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [placement, setPlacement] = useState({
    placementId: "",
    studentId: "",
    studentName: "",
    department: "",
    year: "",
    company: "",
    jobRole: "",
    salaryPackage: "",
    placementDate: "",
    status: "",
  });

  useEffect(() => {
    loadPlacements();
  }, []);

  const loadPlacements = async () => {
    try {
      setLoading(true);

      const response = await api.get("/placements", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPlacementList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setPlacement({
      ...placement,
      [e.target.name]: e.target.value,
    });
  };

  const addPlacement = async () => {
    try {
      await api.post("/placements", placement, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Placement Added Successfully");

      resetForm();

      loadPlacements();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Placement");
    }
  };

  const updatePlacement = async () => {
    try {
      await api.put(`/placements/${editingId}`, placement, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Placement Updated Successfully");

      resetForm();

      setEditingId(null);

      loadPlacements();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  const deletePlacement = async (id) => {
    if (!window.confirm("Delete this placement record?")) return;

    try {
      await api.delete(`/placements/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Placement Deleted");

      loadPlacements();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setPlacement({
      placementId: "",
      studentId: "",
      studentName: "",
      department: "",
      year: "",
      company: "",
      jobRole: "",
      salaryPackage: "",
      placementDate: "",
      status: "",
    });
  };

  const filteredPlacements = placementList.filter(
    (p) =>
      (p.studentName || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (p.studentId || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (p.company || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (p.department || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const totalPlaced = placementList.length;

  const highestPackage =
    placementList.length > 0
      ? Math.max(
          ...placementList.map((p) => Number(p.salaryPackage))
        )
      : 0;

  const averagePackage =
    placementList.length > 0
      ? (
          placementList.reduce(
            (sum, p) => sum + Number(p.salaryPackage),
            0
          ) / placementList.length
        ).toFixed(2)
      : 0;

  const exportCSV = () => {
    const headers = [
      "Placement ID",
      "Student ID",
      "Student Name",
      "Department",
      "Year",
      "Company",
      "Job Role",
      "Salary",
      "Placement Date",
      "Status",
    ];

    const rows = placementList.map((p) => [
      p.placementId,
      p.studentId,
      p.studentName,
      p.department,
      p.year,
      p.company,
      p.jobRole,
      p.salaryPackage,
      p.placementDate,
      p.status,
    ]);

    const csv =
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "placements.csv";

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
      Placement Management
    </h1>

    {/* Statistics Cards */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          background: "#DBEAFE",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <h3>Total Placements</h3>

        <h1>{totalPlaced}</h1>
      </div>

      <div
        style={{
          background: "#DCFCE7",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <h3>Highest Package</h3>

        <h1>₹ {highestPackage} LPA</h1>
      </div>

      <div
        style={{
          background: "#FEF3C7",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <h3>Average Package</h3>

        <h1>₹ {averagePackage} LPA</h1>
      </div>
    </div>

    {/* Search */}

    <input
      type="text"
      placeholder="🔍 Search Student / Company / Department"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        marginBottom: "25px",
      }}
    />

    {/* Placement Form */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: "12px",
        marginBottom: "20px",
      }}
    >
      <input
        name="placementId"
        placeholder="Placement ID"
        value={placement.placementId}
        onChange={handleChange}
      />

      <input
        name="studentId"
        placeholder="Student ID"
        value={placement.studentId}
        onChange={handleChange}
      />

      <input
        name="studentName"
        placeholder="Student Name"
        value={placement.studentName}
        onChange={handleChange}
      />

      <input
        name="department"
        placeholder="Department"
        value={placement.department}
        onChange={handleChange}
      />

      <input
        name="year"
        placeholder="Year"
        value={placement.year}
        onChange={handleChange}
      />

      <input
        name="company"
        placeholder="Company"
        value={placement.company}
        onChange={handleChange}
      />

      <input
        name="jobRole"
        placeholder="Job Role"
        value={placement.jobRole}
        onChange={handleChange}
      />

      <input
        name="salaryPackage"
        placeholder="Salary Package"
        value={placement.salaryPackage}
        onChange={handleChange}
      />

      <input
        type="date"
        name="placementDate"
        value={placement.placementDate}
        onChange={handleChange}
      />

      <input
        name="status"
        placeholder="Placed"
        value={placement.status}
        onChange={handleChange}
      />
    </div>

    <button
      onClick={editingId ? updatePlacement : addPlacement}
      style={{
        background: "#2563EB",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {editingId ? "Update Placement" : "Add Placement"}
    </button>

    <button
      onClick={exportCSV}
      style={{
        background: "green",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "6px",
        cursor: "pointer",
        marginLeft: "10px",
      }}
    >
      Export CSV
    </button>
        <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "30px",
      }}
    >
      <thead
        style={{
          background: "#2563EB",
          color: "white",
        }}
      >
        <tr>
          <th>Placement ID</th>
          <th>Student ID</th>
          <th>Student Name</th>
          <th>Department</th>
          <th>Year</th>
          <th>Company</th>
          <th>Job Role</th>
          <th>Salary (LPA)</th>
          <th>Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {filteredPlacements.map((p) => (
          <tr key={p.id}>
            <td>{p.placementId}</td>
            <td>{p.studentId}</td>
            <td>{p.studentName}</td>
            <td>{p.department}</td>
            <td>{p.year}</td>
            <td>{p.company}</td>
            <td>{p.jobRole}</td>
            <td>{p.salaryPackage}</td>
            <td>{p.placementDate}</td>
            <td>
              <span
                style={{
                  background: "#16A34A",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  fontSize: "13px",
                }}
              >
                {p.status}
              </span>
            </td>

            <td>
              <button
                onClick={() => {
                  setPlacement(p);
                  setEditingId(p.id);
                }}
                style={{
                  background: "#2563EB",
                  color: "white",
                  border: "none",
                  padding: "7px 14px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "8px",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deletePlacement(p.id)}
                style={{
                  background: "#DC2626",
                  color: "white",
                  border: "none",
                  padding: "7px 14px",
                  borderRadius: "5px",
                  cursor: "pointer",
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

export default Placement;