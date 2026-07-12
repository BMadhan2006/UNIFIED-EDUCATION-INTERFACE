import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { FaBriefcase } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import QuickActionCard from "../components/QuickActionCard";
import RecentActivity from "../components/RecentActivity";
import DashboardChart from "../components/DashboardChart";
import AnnouncementCard from "../components/AnnouncementCard";
import { FaUserPlus } from "react-icons/fa";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardCheck,
  FaChartBar,
  FaBell,
  FaClipboardList,
  FaUsers,
  FaSchool,
  FaMoneyBill,
  FaCalendarAlt,
  FaBookOpen,
  FaBookReader,
  FaTasks,
} from "react-icons/fa";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

function Dashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const [stats, setStats] = useState({
  students: 0,
  teachers: 0,
  courses: 0,
  enrollments: 0,
  attendance: 0,
  marks: 0,
  examinations: 0,
  assignments: 0,
  fees: 0,
  library: 0,
  notifications: 0,
  admissions: 0,
});
useEffect(() => {
  loadStats();

  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);
  const loadStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
  students,
  teachers,
  courses,
  enrollments,
  attendance,
  marks,
  examinations,
  assignments,
  fees,
  library,
  notifications,
  admissions,
] = await Promise.all([
        api.get("/students", { headers }),
api.get("/teachers", { headers }),
api.get("/courses", { headers }),
api.get("/enrollments", { headers }),
api.get("/attendance", { headers }),
api.get("/marks", { headers }),
api.get("/examinations", { headers }),
api.get("/assignments", { headers }),
api.get("/fees", { headers }),
api.get("/library", { headers }),
api.get("/notifications", { headers }),
api.get("/admissions", { headers }),
      ]);
setStats({
  students: students.data.length,
  teachers: teachers.data.length,
  courses: courses.data.length,
  enrollments: enrollments.data.length,
  attendance: attendance.data.length,
  marks: marks.data.length,
  examinations: examinations.data.length,
  assignments: assignments.data.length,
  fees: fees.data.length,
  library: library.data.length,
  notifications: notifications.data.length,
  admissions: admissions.data.length,
});
    } catch (error) {
      console.log(error);
    }
  };
  const quickActions = [
  {
    title: "Students",
    description: "Manage all students",
    icon: <FaUsers />,
    path: "/students",
  },
  {
    title: "Teachers",
    description: "Manage faculty",
    icon: <FaSchool />,
    path: "/teachers",
  },
  {
    title: "Courses",
    description: "Manage courses",
    icon: <FaBookOpen />,
    path: "/courses",
  },
  {
    title: "Enrollments",
    description: "Manage enrollments",
    icon: <FaClipboardList />,
    path: "/enrollments",
  },
  {
    title: "Attendance",
    description: "Manage attendance",
    icon: <FaClipboardCheck />,
    path: "/attendance",
  },
  {
    title: "Marks",
    description: "Manage marks",
    icon: <FaChartBar />,
    path: "/marks",
  },
  {
    title: "Timetable",
    description: "Manage timetable",
    icon: <FaCalendarAlt />,
    path: "/timetable",
  },
  {
    title: "Fees",
    description: "Manage fees",
    icon: <FaMoneyBill />,
    path: "/fees",
  },
  {
    title: "Library",
    description: "Manage library",
    icon: <FaBookReader />,
    path: "/library",
  },
  {
    title: "Assignments",
    description: "Manage assignments",
    icon: <FaTasks />,
    path: "/assignment",
  },
  {
  title: "Notifications",
  description: "Manage notifications",
  icon: <FaBell />,
  path: "/notifications",
},

{
  title: "Admissions",
  description: "Manage Admission Applications",
  icon: <FaUserPlus />,
  path: "/admission-management",
},
];

  return (
        <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ marginLeft: "250px", width: "100%" }}>
        <Navbar />

      <div
  style={{
    padding: "30px",
    minHeight: "100vh",
    background: "#F8FAFC",
  }}
>
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
  }}
>
  <div>
    <h1
      style={{
        margin: 0,
        color: "#111827",
      }}
    >
      Admin Dashboard
    </h1>

    <p
      style={{
        color: "#6B7280",
        marginTop: "8px",
      }}
    >
      Welcome to the Unified Education Interface Administration Panel
    </p>
  </div>
  <input
  type="text"
  placeholder="🔍 Search Module..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    marginBottom: "30px",
    fontSize: "16px",
  }}
/>

  <div
    style={{
      background: "#2563EB",
      color: "white",
      padding: "15px 20px",
      borderRadius: "12px",
      textAlign: "center",
      minWidth: "260px",
    }}
  >
    <h3 style={{ margin: 0 }}>
      {currentTime.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </h3>

    <h2 style={{ marginTop: "10px", marginBottom: 0 }}>
      {currentTime.toLocaleTimeString()}
    </h2>
  </div>
</div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <DashboardCard
              title="Students"
              value={stats.students}
              icon={<FaUserGraduate />}
              color="linear-gradient(135deg,#2563EB,#1D4ED8)"
            />

            <DashboardCard
              title="Teachers"
              value={stats.teachers}
              icon={<FaChalkboardTeacher />}
              color="linear-gradient(135deg,#10B981,#059669)"
            />

            <DashboardCard
              title="Courses"
              value={stats.courses}
              icon={<FaBook />}
              color="linear-gradient(135deg,#F59E0B,#D97706)"
            />

            <DashboardCard
              title="Enrollments"
              value={stats.enrollments}
              icon={<FaClipboardList />}
              color="linear-gradient(135deg,#8B5CF6,#7C3AED)"
            />

            <DashboardCard
              title="Attendance"
              value={stats.attendance}
              icon={<FaClipboardCheck />}
              color="linear-gradient(135deg,#06B6D4,#0891B2)"
            />

            <DashboardCard
              title="Marks"
              value={stats.marks}
              icon={<FaChartBar />}
              color="linear-gradient(135deg,#EF4444,#DC2626)"
            />

            <DashboardCard
              title="Examinations"
              value={stats.examinations}
              icon={<FaClipboardList />}
              color="linear-gradient(135deg,#6366F1,#4F46E5)"
            />

            <DashboardCard
              title="Notifications"
              value={stats.notifications}
              icon={<FaBell />}
              color="linear-gradient(135deg,#EC4899,#DB2777)"
            />
            <DashboardCard
              title="Assignments"
              value={stats.assignments}
              icon={<FaTasks />}
              color="linear-gradient(135deg,#14B8A6,#0F766E)"
            />
            <DashboardCard
  title="Fees"
  value={stats.fees}
  icon={<FaMoneyBill />}
  color="linear-gradient(135deg,#F97316,#EA580C)"
/>

<DashboardCard
  title="Library"
  value={stats.library}
  icon={<FaBookReader />}
  color="linear-gradient(135deg,#0EA5E9,#0284C7)"
/>
<DashboardCard
  title="Admissions"
  value={stats.admissions}
  icon={<FaUserPlus />}
  color="linear-gradient(135deg,#7C3AED,#5B21B6)"
/>
<QuickActionCard
  title="Admissions Open"
  description="Online admission application"
  icon={<FaUserPlus />}
  onClick={() => navigate("/admissions")}
  
/>
<QuickActionCard
  title="Placement"
  description="Manage student placements"
  icon={<FaBriefcase />}
  onClick={() => navigate("/placement")}
/>

</div>

          <h2 className="section-title">Quick Actions</h2>

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
  }}
>
  {quickActions
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .map((item) => (
      <QuickActionCard
        key={item.title}
        title={item.title}
        description={item.description}
        icon={item.icon}
        onClick={() => navigate(item.path)}
      />
    ))}
</div>
                    <RecentActivity />

          <DashboardChart stats={stats} />

          <AnnouncementCard />
          <Footer />
          <ChatBot />
        </div>
      </div>
  </div>
  );
  }
export default Dashboard;