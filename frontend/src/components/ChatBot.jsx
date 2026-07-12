import { useState, useRef, useEffect } from "react";
import { FaRobot } from "react-icons/fa";

function ChatBot() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to Unified Education Interface.\nHow can I help you?",
    },
  ]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);
  
const getReply = (msg) => {
  msg = msg.toLowerCase().trim();

  if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey"))
    return "Hello 👋 Welcome to Unified Education Interface.";

  if (msg.includes("admission"))
    return "Admissions are currently open. Please fill the Admission Form.";

  if (msg.includes("course"))
    return "We offer CSE, AI & ML, IT, ECE, Mechanical and Civil Engineering.";

  if (msg.includes("fee"))
    return "Please visit the Fees Module for payment details.";

  if (msg.includes("attendance"))
    return "Attendance details are available in the Attendance Module.";

  if (
    msg.includes("mark") ||
    msg.includes("marks") ||
    msg.includes("result") ||
    msg.includes("score")
  )
    return "Marks are available in the Marks Management Module.";

  if (msg.includes("teacher"))
    return "Teacher information is available in the Teachers Module.";

  if (msg.includes("library"))
    return "Library contains books, journals and digital resources.";

  if (msg.includes("contact"))
    return "Email: info@uei.edu\nPhone: +91 9876543210";

  return "Sorry, I couldn't understand. Try asking about Admission, Courses, Fees, Attendance, Marks, Teachers or Library.";
};

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    const botMessage = {
      sender: "bot",
      text: getReply(input),
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <>
      {/* Floating Robot Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 25,
          right: 25,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "none",
          background: "#2563EB",
          color: "white",
          cursor: "pointer",
          zIndex: 9999,
        }}
      >
        <FaRobot size={28} />
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 20,
            width: 350,
            background: "white",
            borderRadius: 15,
            boxShadow: "0 0 15px rgba(0,0,0,.2)",
            overflow: "hidden",
            zIndex: 9999,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#2563EB",
              color: "white",
              padding: "12px",
              fontWeight: "bold",
            }}
          >
            <FaRobot size={28} />

            <div>
              <div>UEI Assistant</div>
              <small style={{ color: "#DBEAFE" }}>
                AI Education Chatbot
              </small>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              height: 300,
              overflowY: "auto",
              padding: 10,
            }}
          >
            {messages.map((m, index) => (
              <div
                key={index}
                style={{
                  textAlign: m.sender === "user" ? "right" : "left",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    background:
                      m.sender === "user" ? "#2563EB" : "#E5E7EB",
                    color: m.sender === "user" ? "white" : "black",
                    padding: "10px 14px",
                    borderRadius: 15,
                    whiteSpace: "pre-line",
                  }}
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              borderTop: "1px solid #ddd",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: "12px",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                width: 70,
                border: "none",
                background: "#2563EB",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;