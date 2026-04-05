import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/back-button.css";

const GlobalBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showButton, setShowButton] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Check if we can go back in history
    // We can go back if we're not on the home page or if history exists
    const isHome = location.pathname === "/";
    setCanGoBack(!isHome);

    // Show button if not on home page
    setShowButton(!isHome);
  }, [location.pathname]);

  const handleGoBack = () => {
    // Use -1 to go back in browser history (preserves all state)
    navigate(-1);
  };

  if (!showButton || !canGoBack) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.button
        className="global-back-button"
        onClick={handleGoBack}
        whileHover={{ scale: 1.1, x: -8 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        aria-label="Go back to previous page"
        title="Go back to previous page"
      >
        <FiArrowLeft size={24} />
      </motion.button>
    </AnimatePresence>
  );
};

export default GlobalBackButton;
