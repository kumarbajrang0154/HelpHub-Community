import React from "react";
import MainLayout from "../../layouts/MainLayout";

const Dashboard = () => {
  return (
    <MainLayout>
      {/* HOME */}
      <section id="home" className="section">
        <h1>Welcome to AI Student Platform 🚀</h1>
        <p>All your study tools in one place</p>
      </section>

      {/* SERVICES */}
      <section id="services" className="section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">PDF Summarizer</div>
          <div className="service-card">AI Chatbot</div>
          <div className="service-card">Project Help</div>
          <div className="service-card">Voice AI</div>
          <div className="service-card">Explainer</div>
          <div className="service-card">Plagiarism Checker</div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <h2>Contact Us</h2>
        <p>Email: support@ai-platform.com</p>
      </section>
    </MainLayout>
  );
};

export default Dashboard;