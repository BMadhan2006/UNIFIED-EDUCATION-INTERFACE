import { useNavigate } from "react-router-dom";

function Admissions() {

  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      name: "B.E Computer Science and Engineering (AI & ML)",
      duration: "4 Years",
      seats: 90,
    },
    {
      id: 2,
      name: "B.E Computer Science and Engineering",
      duration: "4 Years",
      seats: 120,
    },
    {
      id: 3,
      name: "B.Tech Information Technology",
      duration: "4 Years",
      seats: 90,
    },
    {
      id: 4,
      name: "B.E Electronics & Communication",
      duration: "4 Years",
      seats: 120,
    },
    {
      id: 5,
      name: "B.E Mechanical Engineering",
      duration: "4 Years",
      seats: 60,
    },
    {
      id: 6,
      name: "B.E Civil Engineering",
      duration: "4 Years",
      seats: 60,
    },
    {
      id: 7,
      name: "B.Tech Artificial Intelligence and Machine Learning",
      duration: "4 Years",
      seats: 90,
    },
    {
      id: 8,
      name: "B.Tech Artificial Intelligence and Data Science",
      duration: "4 Years",
      seats: 60,
    },
  ];

  return (

    <div style={{padding:"40px"}}>

      <h1>🎓 Admissions Open 2026-2027</h1>

      <p>Select your preferred course.</p>

      <div
      style={{
        display:"grid",
        gridTemplateColumns:"repeat(3,1fr)",
        gap:"25px",
        marginTop:"30px"
      }}
      >

      {courses.map(course=>(

        <div
        key={course.id}
        style={{
          border:"1px solid #ddd",
          borderRadius:"10px",
          padding:"20px",
          boxShadow:"0 5px 10px rgba(0,0,0,.1)"
        }}
        >

          <h2>{course.name}</h2>

          <p>Duration : {course.duration}</p>

          <p>Seats Available : {course.seats}</p>

          <button
onClick={() =>
  navigate("/admission-form", {
    state: { course: course.name },
  })
}         style={{
            padding:"10px 20px",
            background:"#2563EB",
            color:"white",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer"
          }}
          >
            Apply Now
          </button>

        </div>

      ))}

      </div>

    </div>

  );

}

export default Admissions;