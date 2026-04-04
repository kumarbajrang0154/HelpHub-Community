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

        <div className="hero-left">
          <h1>
            Get where you're <br />
            going faster with <span>AI Platform</span>
          </h1>

          <p>
            Expand your skills in development, analytics and AI-powered tools.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/register")} className="primary-btn">
              Start Now
            </button>
            <button onClick={() => navigate("/login")} className="secondary-btn">
              Login
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE + FLOATING CARDS */}
        <div className="hero-right">

          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="student"
            className="hero-img"
          />

          {/* FLOATING CARDS */}
          <div className="floating-card card1">AI Chat</div>
          <div className="floating-card card2">PDF AI</div>
          <div className="floating-card card3">Voice Help</div>

        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="services">

        <h2>Our Services</h2>

        <div className="service-container">
          <div className="service-card">📄 AI PDF Summarizer</div>
          <div className="service-card">🤖 AI Chatbot</div>
          <div className="service-card">🎤 Voice Doubt Solver</div>
          <div className="service-card">📚 Project Support</div>
        </div>

      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>Email: support@ai.com</p>
      </section>

    </div>
  );
};

export default Home;