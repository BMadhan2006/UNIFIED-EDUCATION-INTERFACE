import { Link, NavLink, useNavigate } from "react-router-dom";import {
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardCheck,
  FaChartBar,
  FaCalendarAlt,
  FaBell,
  FaMoneyBill,
  FaBookOpen,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/sidebar.css";
import { FaUserCircle } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
function Sidebar() {
    const navigate = useNavigate();

const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (confirmLogout) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("profileImage");

    navigate("/");
  }
};
  return (
    <div className="sidebar">
      <h2 className="logo">🎓 UEI</h2>

      <Link to="/dashboard">
        <FaTachometerAlt /> Dashboard
      </Link>

      <Link to="/students">
        <FaUserGraduate /> Students
      </Link>

      <Link to="/teachers">
        <FaChalkboardTeacher /> Teachers
      </Link>
      
<Link to="/placement">
    <FaBriefcase />
    <span>Placement</span>
</Link>
      <Link to="/courses">
        <FaBook /> Courses
      </Link>

      <Link to="/enrollments">
        <FaClipboardList /> Enrollments
      </Link>

      <Link to="/attendance">
        <FaClipboardCheck /> Attendance
      </Link>

      <Link to="/marks">
        <FaChartBar /> Marks
      </Link>

      <Link to="/examinations">
        <FaClipboardList /> Examinations
      </Link>

      <Link to="/timetable">
        <FaCalendarAlt /> Timetable
      </Link>

      <Link to="/notifications">
        <FaBell /> Notifications
      </Link>
      <Link to="/assignment">
    <FaBookOpen /> Assignments
</Link>

      <Link to="/fees">
        <FaMoneyBill /> Fees
      </Link>

      <Link to="/library">
        <FaBookOpen /> Library
      </Link>

      <div
  onClick={handleLogout}
  style={{
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px",
    color: "white",
  }}
>
  <FaSignOutAlt />
  Logout
</div>
      <Link to="/profile">
  <FaUserCircle /> Profile
</Link>
<NavLink to="/reports">
  <FaFileAlt />
  <span>Reports</span>
</NavLink>
<Link to="/settings">
  <FaCog /> Settings
</Link>
<Link to="/about">
    <FaInfoCircle /> About
</Link>
<Link to="/admission-management">
  <FaUserPlus /> Admission Management
</Link>
<Link to="/contact">
  <FaPhoneAlt />
  <span>Contact Us</span>
</Link>
    </div>
  );
}

export default Sidebar;