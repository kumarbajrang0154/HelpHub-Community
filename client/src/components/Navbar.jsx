import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => scrollTo("home")}>
        AI Platform
      </div>

      <div className="nav-links">
        <button onClick={() => scrollTo("home")}>Home</button>
        <button onClick={() => scrollTo("services")}>Services</button>
        <button onClick={() => scrollTo("how")}>How</button>
        <button onClick={() => scrollTo("team")}>Team</button>
        <button onClick={() => scrollTo("contact")}>Contact</button>
      </div>
    </nav>
  );
};

export default Navbar;