import React, { useState } from "react";
import "../assets/contact.css"

const Contact = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent: ${message}`);
    setMessage("");
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Write Your Massage Here..</h2>

      <form onSubmit={handleSubmit} className="contact-form">
        <textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="10"
        />

        <button type="submit" className="btn contact-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
