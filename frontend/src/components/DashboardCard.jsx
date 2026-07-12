import { useEffect, useState } from "react";

function DashboardCard({ title, value, icon, color }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const timer = setInterval(() => {
      start++;

      if (start >= value) {
        start = value;
        clearInterval(timer);
      }

      setCount(start);
    }, 30);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div
      style={{
        flex: "1",
        minWidth: "230px",
        background: color,
        borderRadius: "15px",
        padding: "20px",
        color: "white",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h3
          style={{
            margin: 0,
            fontSize: "18px",
            color: "white",
          }}
        >
          {title}
        </h3>

        <h1
          style={{
            marginTop: "10px",
            fontSize: "35px",
            color: "white",
          }}
        >
          {count}
        </h1>
      </div>

      <div
        style={{
          fontSize: "45px",
          color: "white",
        }}
      >
        {icon}
      </div>
    </div>
  );
}

export default DashboardCard;