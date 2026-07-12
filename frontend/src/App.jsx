import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Courses from "./pages/Courses";
import Enrollments from "./pages/Enrollments";
import Attendance from "./pages/Attendance";
import Marks from "./pages/Marks";
import Examinations from "./pages/Examinations";
import Timetable from "./pages/Timetable";
import Assignment from "./pages/Assignment";
import Fee from "./pages/Fee";
import Library from "./pages/Library";
import Notification from "./pages/Notification";

import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

import MyCourses from "./pages/MyCourses";
import MyTimetable from "./pages/MyTimetable";
import MyAttendance from "./pages/MyAttendance";
import MyMarks from "./pages/MyMarks";
import MyAssignments from "./pages/MyAssignments";
import MyFeeStatus from "./pages/MyFeeStatus";
import MyNotifications from "./pages/MyNotifications";
import MyLibrary from "./pages/MyLibrary";

import TeacherCourses from "./pages/TeacherCourses";
import TeacherTimetable from "./pages/TeacherTimetable";
import TeacherAttendance from "./pages/TeacherAttendance";
import TeacherMarks from "./pages/TeacherMarks";
import TeacherAssignments from "./pages/TeacherAssignments";
import TeacherNotifications from "./pages/TeacherNotifications";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Admissions from "./pages/Admissions";
import AdmissionManagement from "./pages/AdmissionManagement";
import AdmissionForm from "./pages/AdmissionForm";
import AdmissionView from "./pages/AdmissionView";
import ContactUs from "./pages/ContactUs";
import Placement from "./pages/Placement";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/enrollments" element={<Enrollments />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/marks" element={<Marks />} />
        <Route path="/examinations" element={<Examinations />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/assignments" element={<Assignment />} />
        <Route path="/fees" element={<Fee />} />
        <Route path="/library" element={<Library />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/my-timetable" element={<MyTimetable />} />
        <Route path="/my-attendance" element={<MyAttendance />} />
        <Route path="/my-marks" element={<MyMarks />} />
        <Route path="/my-assignments" element={<MyAssignments />} />
        <Route path="/my-fee-status" element={<MyFeeStatus />} />
        <Route path="/my-notifications" element={<MyNotifications />} />
        <Route path="/my-library" element={<MyLibrary />} />

        <Route path="/teacher-courses" element={<TeacherCourses />} />
        <Route path="/teacher-timetable" element={<TeacherTimetable />} />
        <Route path="/teacher-attendance" element={<TeacherAttendance />} />
        <Route path="/teacher-marks" element={<TeacherMarks />} />
        <Route path="/teacher-assignments" element={<TeacherAssignments />} />
        <Route path="/teacher-notifications" element={<TeacherNotifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route
  path="/admission-management"
  element={<AdmissionManagement />}
/>
<Route path="/admission-form" element={<AdmissionForm />} />
<Route path="/admission-view" element={<AdmissionView />} />
<Route path="/contact" element={<ContactUs />} />
<Route path="/placement" element={<Placement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;