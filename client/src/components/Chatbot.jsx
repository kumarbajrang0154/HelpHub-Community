import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import ChatWindow from "./ChatWindow";
import "../styles/chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const userPlan = localStorage.getItem("userPlan") || "free";

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <motion.button
        className="chatbot-icon"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
        }}
        aria-label="Open chat"
      >
        <FiMessageCircle size={28} />
      </motion.button>

      {/* Chat Window Popup */}
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            userPlan={userPlan}
            userName={user?.displayName || "Guest"}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
