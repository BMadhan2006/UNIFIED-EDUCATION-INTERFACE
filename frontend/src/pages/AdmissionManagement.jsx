import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdmissionManagement() {
  const navigate = useNavigate();

  const [admissions, setAdmissions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAdmissions();
  }, []);

  const loadAdmissions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/admissions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAdmissions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approveAdmission = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/admissions/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadAdmissions();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectAdmission = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/admissions/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadAdmissions();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAdmission = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!window.confirm("Delete this admission?")) return;

      await api.delete(`/admissions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadAdmissions();
    } catch (error) {
      console.log(error);
    }
  };

  const editAdmission = (admission) => {
    navigate("/admission-form", {
      state: {
        editMode: true,
        admission,
      },
    });
  };

  const filteredAdmissions = admissions.filter(
    (a) =>
      a.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      a.email?.toLowerCase().includes(search.toLowerCase()) ||
      a.course?.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admission Management</h1>

      <input
        type="text"
        placeholder="🔍 Search by Name, Email or Course"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          margin: "20px 0",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead style={{ background: "#2563EB", color: "white" }}>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Course</th>
            <th style={thStyle}>10th %</th>
            <th style={thStyle}>12th %</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredAdmissions.map((admission) => (
            <tr key={admission.id}>
              <td style={tdStyle}>{admission.fullName}</td>
              <td style={tdStyle}>{admission.email}</td>
              <td style={tdStyle}>{admission.phone}</td>
              <td style={tdStyle}>{admission.course}</td>
              <td style={tdStyle}>{admission.tenthPercentage}</td>
              <td style={tdStyle}>{admission.twelfthPercentage}</td>

              <td style={tdStyle}>
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    color: "white",
                    background:
                      admission.status === "Approved"
                        ? "green"
                        : admission.status === "Rejected"
                        ? "red"
                        : "orange",
                  }}
                >
                  {admission.status}
                </span>
              </td>

              <td style={tdStyle}>
                <button
                  style={approveButton}
                  onClick={() => approveAdmission(admission.id)}
                >
                  Approve
                </button>

                <button
                  style={rejectButton}
                  onClick={() => rejectAdmission(admission.id)}
                >
                  Reject
                </button>

                <button
                  style={editButton}
                  onClick={() => editAdmission(admission)}
                >
                  Edit
                </button>

                <button
                  style={deleteButton}
                  onClick={() => deleteAdmission(admission.id)}
                >
                  Delete
                </button>

                <button
                  style={viewButton}
                  onClick={() =>
                    navigate("/admission-view", {
                      state: admission,
                    })
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  border: "1px solid #ddd",
};

const tdStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  textAlign: "center",
};

const approveButton = {
  background: "green",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  margin: "3px",
  cursor: "pointer",
};

const rejectButton = {
  background: "red",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  margin: "3px",
  cursor: "pointer",
};

const editButton = {
  background: "#2563EB",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  margin: "3px",
  cursor: "pointer",
};

const deleteButton = {
  background: "#374151",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  margin: "3px",
  cursor: "pointer",
};

const viewButton = {
  background: "#0EA5E9",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  margin: "3px",
  cursor: "pointer",
};

export default AdmissionManagement;