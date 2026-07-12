import { useEffect, useState } from "react";
import Footer from "../components/Footer";
function Profile() {
  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@uei.com",
    phone: "9876543210",
    department: "Administration",
    role: "Administrator",
    password: "",
    confirmPassword: "",
  });

  const [image, setImage] = useState(
  localStorage.getItem("profileImage") || null
);
  const handleImage = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setImage(reader.result);
    localStorage.setItem("profileImage", reader.result);
  };

  reader.readAsDataURL(file);
};

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  
  const saveProfile = () => {
  if (
    profile.password &&
    profile.password
    ) {
      alert("Passwords do not match");
      return;
    }

    alert("Profile Updated Successfully");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1
        style={{
          color: "#111827",
          fontSize: "36px",
          marginBottom: "30px",
        }}
      >
        My Profile
      </h1>

      <div
        style={{
          maxWidth: "700px",
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 10px 20px rgba(0,0,0,.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={
              image ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "15px",
            }}
          />

          <br />

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />
        </div>

        <br />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={profile.phone}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={profile.department}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          value={profile.role}
          readOnly
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={profile.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={profile.confirmPassword}
          onChange={handleChange}
          style={inputStyle}
        />

        <div
          style={{
            marginTop: "20px",
            color: "#6B7280",
          }}
        >
          Last Login : {new Date().toLocaleString()}
        </div>

        <button
          onClick={saveProfile}
          style={{
            marginTop: "30px",
            padding: "12px 30px",
            background: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Save Changes
        </button>
      </div>
      <Footer />
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  boxSizing: "border-box",
};
<Footer />
export default Profile;