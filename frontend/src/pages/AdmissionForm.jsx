import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
function AdmissionForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const editMode = location.state?.editMode || false;
  const editData = location.state?.admission;

const [admission, setAdmission] = useState(
  editData || {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    course: "",
    tenthPercentage: "",
    twelfthPercentage: "",
    address: "",
    tenthMarksheet: "",
    twelfthMarksheet: "",
    photo: "",
  }
);

  const handleChange = (e) => {
    setAdmission({
      ...admission,
      [e.target.name]: e.target.value,
    });
  };
  const handleFile = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setAdmission({
      ...admission,
      [e.target.name]: reader.result,
    });
  };

  reader.readAsDataURL(file);
};

  const submitAdmission = async () => {
    try {
     if (editMode) {
  await api.put(`/admissions/${admission.id}`, admission);
  alert("Admission Updated Successfully");
} else {
  await api.post("/admissions", admission);
  alert("Admission Submitted Successfully");
}

navigate("/admission-management");
      alert("Application Submitted Successfully!");

      navigate("/");

    } catch (error) {
      console.log(error);
      alert("Submission Failed");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
      <h1>Admission Application Form</h1>


<input
  type="text"
  name="fullName"
  placeholder="Full Name"
  value={admission.fullName || ""}
  onChange={handleChange}
  style={inputStyle}
/>

<input
  type="date"
  name="dob"
  value={admission.dob || ""}
  onChange={handleChange}
  style={inputStyle}
/>

<select
  name="gender"
  value={admission.gender || ""}
  onChange={handleChange}
  style={inputStyle}
>
  <option value="">Select Gender</option>
  <option>Male</option>
  <option>Female</option>
  <option>Other</option>
</select>

      <input
        type="email"
        name="email"
        placeholder="Email"
      value={admission .email || ""}
        onChange={handleChange}
        style={inputStyle}
      />
      {/* 10th Percentage */}
<label style={{ fontWeight: "bold", marginTop: "15px", display: "block" }}>
  10th Percentage
</label>

<input
  type="number"
  name="tenthMark"
  placeholder="Enter 10th Percentage"
  value={admission.tenthMark || ""}
  onChange={handleChange}
  style={inputStyle}
/>

{/* 10th Marksheet */}
<label style={{ fontWeight: "bold", marginTop: "15px", display: "block" }}>
  10th Marksheet
</label>

<input
  type="file"
  accept=".pdf,.jpg,.jpeg,.png"
  style={inputStyle}
/>

{/* 12th Percentage */}
<label style={{ fontWeight: "bold", marginTop: "15px", display: "block" }}>
  12th Percentage
</label>

<input
  type="number"
  name="twelfthMark"
  placeholder="Enter 12th Percentage"
  value={admission.twelfthMark || ""}
  onChange={handleChange}
  style={inputStyle}
/>

{/* 12th Marksheet */}
<label style={{ fontWeight: "bold", marginTop: "15px", display: "block" }}>
  12th Marksheet
</label>

<input
  type="file"
  accept=".pdf,.jpg,.jpeg,.png"
  style={inputStyle}
/>

<label>Passport Photo</label>
<input
  type="file"
  name="photo"
  accept=".jpg,.jpeg,.png"
  onChange={handleFile}
  style={inputStyle}
/>
{admission.photo && (
  <img
    src={admission.photo}
    alt="Preview"
    style={{
      width: "120px",
      height: "120px",
      borderRadius: "10px",
      marginTop: "15px",
    }}
  />
)}
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={admission.phone || ""}
        onChange={handleChange}
        style={inputStyle}
      />
<select
  name="course"
  value={admission.course || ""}
  onChange={handleChange}
  style={inputStyle}
>
  <option value="">-- Select Course --</option>

  <option>B.E Computer Science and Engineering (AI & ML)</option>
  <option>B.E Computer Science and Engineering</option>
  <option>B.Tech Information Technology</option>
  <option>B.E Electronics & Communication</option>
  <option>B.E Mechanical Engineering</option>
  <option>B.E Civil Engineering</option>
  <option>B.Tech Artificial Intelligence and Machine Learning</option>
  <option>B.Tech Artificial Intelligence and Data Science</option>
</select>
     

      <textarea
        name="address"
        placeholder="Address"
        value={admission.address|| ""}
        onChange={handleChange}
        style={{
          ...inputStyle,
          height: "120px",
        }}
      />

      <button
        onClick={submitAdmission}
        style={{
          padding: "12px 25px",
          background: "#b3263b",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Submit Application
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

export default AdmissionForm;