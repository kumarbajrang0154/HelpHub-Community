import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      {/* ================= HERO ================= */}
      <section id="home" className="hero">
        
        {/* LEFT CONTENT */}
        <div className="hero-left">
          <h1>
            Get where you're <br />
            going faster with <span>AI Platform</span>
          </h1>

          <p>
            Expand your skills in development, testing, analytics
            and designing with AI-powered tools.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/register")}
            >
              Start Now
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-right">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            alt="AI Student"
          />
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="section">
        <h2>Our Services</h2>

        <div className="card-container">
          <div className="card">📄 AI PDF Summarizer</div>
          <div className="card">🤖 AI Chatbot</div>
          <div className="card">🎤 Voice Doubt Solver</div>
          <div className="card">📚 Project Support</div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="section">
        <h2>Contact Us</h2>

        <p>Email: support@aistudent.com</p>
        <p>Phone: +91 9876543210</p>
      </section>

    </div>
  );
};

export default Home;