import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  const scrollTo = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="navbar">
      
      {/* LEFT */}
      <div className="logo" onClick={() => scrollTo("home")}>
        AI Platform
      </div>

      {/* RIGHT */}
      <div className="nav-links">
        <button onClick={() => scrollTo("home")}>Home</button>
        <button onClick={() => scrollTo("services")}>Services</button>
        <button onClick={() => scrollTo("contact")}>Contact</button>
        <button>Profile</button>
      </div>

    </nav>
  );
};

export default Navbar;