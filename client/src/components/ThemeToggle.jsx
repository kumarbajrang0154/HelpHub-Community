import React from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import "../styles/theme-toggle.css";

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, rotate: -90 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.3 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <motion.div
        className="theme-icon"
        initial={false}
        animate={{
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 0.8,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isDark ? (
          <FiSun size={18} />
        ) : (
          <FiMoon size={18} />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
