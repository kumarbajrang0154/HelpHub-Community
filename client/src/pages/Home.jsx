import React from "react";
import Navbar from "../components/Navbar";
import "../styles/home.css";

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section id="home" className="section hero">
        <h1>🚀 AI Student Platform</h1>
        <p>Your AI-powered learning assistant</p>
        <div className="hero-btns">
          <button>Get Started</button>
          <button>Login</button>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section services">
        <h2>Our Services</h2>

        <div className="card-container">
          <div className="card">📄 AI PDF Summarizer</div>
          <div className="card">🤖 AI Chatbot</div>
          <div className="card">🎤 Voice Doubt Solver</div>
          <div className="card">📚 Project Support</div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section how">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">1️⃣ Sign Up</div>
          <div className="step">2️⃣ Upload / Ask</div>
          <div className="step">3️⃣ Get AI Help</div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="section team">
        <h2>Meet the Developers</h2>

        <div className="card-container">
          <div className="card">
            👨‍💻 Bajrang Kumar <br /> Full Stack Developer
          </div>

          <div className="card">
            👨‍💻 Team Member <br /> AI Engineer
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact">
        <h2>Contact Us</h2>

        <p>Email: support@aistudent.com</p>
        <p>Phone: +91 9876543210</p>
      </section>
    </div>
  );
};

export default Home;