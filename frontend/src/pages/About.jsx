import {
  FaUniversity,
  FaLaptopCode,
  FaDatabase,
  FaJava,
  FaReact,
  FaGithub,
} from "react-icons/fa";

function About() {
  const card = {
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,.1)",
    marginBottom: "20px",
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>ℹ️ About Unified Education Interface</h1>

      <div style={card}>
        <h2>Project Information</h2>

        <p><strong>Project Name:</strong> Unified Education Interface</p>
        <p><strong>Version:</strong> 1.0</p>
        <p><strong>Project Type:</strong> Full Stack Web Application</p>
      </div>

      <div style={card}>
        <h2>Developer</h2>

        <p><strong>Name:</strong> Madhan B</p>
        <p><strong>Department:</strong> CSE (AI & ML)</p>
        <p><strong>College:</strong> VSB Engineering College</p>
      </div>

      <div style={card}>
        <h2>Technologies Used</h2>

        <p><FaReact color="#61DBFB" /> React.js</p>

        <p><FaJava color="red" /> Spring Boot</p>

        <p><FaDatabase color="#2563EB" /> MySQL & MongoDB</p>

        <p><FaLaptopCode color="#10B981" /> REST API</p>

        <p><FaGithub /> Git & GitHub</p>
      </div>

      <div style={card}>
        <h2>Purpose</h2>

        <p>
          The Unified Education Interface is designed to manage students,
          teachers, courses, attendance, examinations, assignments,
          notifications, library, fees, reports, and other academic
          activities through a single integrated platform.
        </p>
      </div>
    </div>
  );
}

export default About;