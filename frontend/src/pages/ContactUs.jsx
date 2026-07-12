import React from "react";

function ContactUs() {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ color: "#2563EB" }}>Contact Us</h1>

      <p>
        If you have any questions regarding the Unified Education Interface,
        feel free to contact us.
      </p>

      <div
        style={{
          marginTop: "30px",
          background: "#F9FAFB",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,.1)",
        }}
      >
        <h3>📍 Address</h3>
        <p>B.R.M.G Institute of Technology,Kovilur,Tamil Nadu-626121</p>

        <h3>📞 Phone</h3>
        <p>+91 9876543210</p>

        <h3>📧 Email</h3>
        <p>brmg@gmail.com</p>

        <h3>🌐 Website</h3>
        <p>www.uei.edu</p>
      </div>

      <h2 style={{ marginTop: "35px" }}>Send us a Message</h2>

      <form>
        <input
          type="text"
          placeholder="Your Name"
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Your Email"
          style={inputStyle}
        />

        <textarea
          placeholder="Your Message"
          rows="5"
          style={inputStyle}
        ></textarea>

        <button
          type="button"
          onClick={() => alert("Message Sent Successfully!")}
          style={buttonStyle}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #D1D5DB",
  fontSize: "15px",
  boxSizing: "border-box",
};

const buttonStyle = {
  marginTop: "20px",
  padding: "12px 25px",
  background: "#2563EB",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

export default ContactUs;