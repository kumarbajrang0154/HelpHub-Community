import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", target: "hero" },
  { label: "Services", target: "services" },
  { label: "Contact", target: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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
      <button className="brand" onClick={() => scrollTo("hero")}>NovaMind</button>

      <div className="nav-center">
        {navItems.map((item) => (
          <button key={item.target} className="nav-link" onClick={() => scrollTo(item.target)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="nav-actions">
        <button className="ghost-btn">Login</button>
        <button className="primary-btn">Sign up</button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
