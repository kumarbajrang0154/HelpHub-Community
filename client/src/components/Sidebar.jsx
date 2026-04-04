import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>Dashboard</li>
        <li>PDF Summarizer</li>
        <li>AI Chat</li>
        <li>Projects</li>
        <li>Voice Doubt</li>
        <li>Plagiarism</li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    background: "#020617",
    height: "100vh",
    padding: "20px",
  },
  logo: {
    color: "#3b82f6",
    marginBottom: "30px",
  },
  link: {
    display: "flex",
    gap: "10px",
    color: "#fff",
    marginBottom: "15px",
    textDecoration: "none",
  },
};

export default Sidebar;