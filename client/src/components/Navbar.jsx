import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { useSmartNavigation } from "../hooks/useSmartNavigation";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", route: "/" },
  { label: "Services", route: "/services" },
  { label: "Workflow", target: "workflow" },
  { label: "Developers", target: "developers" },
  { label: "Contact", target: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const location = useLocation();
  const { handleNavigation, currentPath } = useSmartNavigation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle scroll-to when returning from other pages
  useEffect(() => {
    if (location.state?.scrollTarget && location.pathname === "/") {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
    }
  }, [location]);

  const isActive = (item) => {
    if (item.route) {
      return currentPath === item.route ? "nav-link-active" : "";
    }
    return "";
  };

  const profileAvatar = user?.name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0f172a&color=38bdf8&rounded=true&size=44`
    : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=44&q=80";

  return (
    <motion.nav
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link className="brand" to="/">!Edvance Platform</Link>

      <div className="nav-center">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-link ${isActive(item)}`}
            onClick={() => handleNavigation(item)}
          >
            {item.label}
            {isActive(item) && (
              <motion.div
                className="nav-underline"
                layoutId="underline"
                initial={false}
              />
            )}
          </button>
        ))}
      </div>

      <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className="nav-actions">
        <ThemeToggle />
        {isAuthenticated ? (
          <div className="avatar-container">
            <img
              className="avatar"
              src={profileAvatar}
              alt="Profile"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                  Profile
                </Link>
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
            <button
              key={item.label}
              className="mobile-nav-link"
              onClick={() => {
                handleNavigation(item);
                setMobileMenuOpen(false);
              }}
            >
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
