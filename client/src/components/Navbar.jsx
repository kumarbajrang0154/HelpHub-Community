import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const navItems = [
  { label: "Home", target: "hero" },
  { label: "Services", target: "services" },
  { label: "Workflow", target: "workflow" },
  { label: "Developers", target: "developers" },
  { label: "Contact", target: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <button className="brand" onClick={() => scrollTo("hero")}>AI Platform</button>

      <div className="nav-center">
        {navItems.map((item) => (
          <button key={item.target} className="nav-link" onClick={() => scrollTo(item.target)}>
            {item.label}
          </button>
        ))}
      </div>

      <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className="nav-actions">
        {isAuthenticated ? (
          <div className="avatar-container">
            <img
              className="avatar"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=40&q=80"
              alt="Profile"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item">Profile</button>
                <button className="dropdown-item" onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="ghost-btn">Login</Link>
            <Link to="/signup" className="primary-btn">Sign up</Link>
          </>
        )}
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <button key={item.target} className="mobile-nav-link" onClick={() => { scrollTo(item.target); setMobileMenuOpen(false); }}>
              {item.label}
            </button>
          ))}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
            </>
          )}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
