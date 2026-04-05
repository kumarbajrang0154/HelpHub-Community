import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX, FiMaximize2, FiSend, FiThumbsUp, FiThumbsDown, FiVolume2, FiVolume1 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getAIResponse } from "../services/openaiService";
import { playNotificationSound, isSoundEnabled, toggleSoundNotifications } from "../services/audioService";
import { analytics } from "../services/analyticsService";
import { historyService } from "../services/historyService";
import "../styles/chatbot.css";

const ChatWindow = ({ isOpen, onClose, userPlan, userName }) => {
  const [messages, setMessages] = useState(() => {
    const recent = historyService.getRecentHistory(10);
    if (recent.length === 0) {
      return [
        {
          id: `msg_${Date.now()}`,
          type: "bot",
          text: `👋 Hi ${userName}! I'm AI Assistant. How can I help you today?`,
          timestamp: new Date(),
          feedback: null,
        },
      ];
    }
    // Convert string timestamps back to Date objects
    return recent.map((msg) => ({
      ...msg,
      timestamp: typeof msg.timestamp === "string" ? new Date(msg.timestamp) : msg.timestamp,
      feedback: msg.feedback || null,
    }));
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(isSoundEnabled());
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    analytics.trackSession();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: `msg_${Date.now()}`,
      type: "user",
      text: input,
      timestamp: new Date(),
      feedback: null,
    };

    setMessages((prev) => [...prev, userMessage]);
    historyService.addMessage(userMessage);
    analytics.trackMessage(input.length, true);
    setInput("");
    setIsTyping(true);

    // Get AI response
    setTimeout(async () => {
      try {
        const botResponseText = await getAIResponse(input, userPlan);

        const botMessage = {
          id: `msg_${Date.now()}`,
          type: "bot",
          text: botResponseText,
          timestamp: new Date(),
          feedback: null,
        };

        setMessages((prev) => [...prev, botMessage]);
        historyService.addMessage(botMessage);
        analytics.trackMessage(botResponseText.length, false);

        if (soundEnabled) {
          playNotificationSound();
        }
      } catch (error) {
        console.error("Error getting AI response:", error);
      }
      setIsTyping(false);
    }, 800);
  };

  const handleExpand = () => {
    analytics.trackExpand();
    onClose();
    navigate("/chat");
  };

  const handleFeedback = (messageId, rating) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, feedback: rating } : msg
      )
    );
    analytics.trackFeedback(messageId, rating);
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    toggleSoundNotifications(newState);
  };

  const formatTime = (date) => {
    try {
      // Handle both Date objects and ISO strings
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (error) {
      console.error("Error formatting time:", error);
      return "--:--";
    }
  };

  return (
    <motion.div
      className="chat-window-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="chat-window"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-avatar">AI</div>
            <div className="chat-header-info">
              <h3>AI Assistant</h3>
              <span className="chat-status">
                <span className="status-dot"></span> Online
              </span>
            </div>
          </div>
          <div className="chat-header-actions">
            <button
              className="chat-action-btn sound-btn"
              onClick={toggleSound}
              title={soundEnabled ? "Sound on" : "Sound off"}
            >
              {soundEnabled ? <FiVolume2 size={18} /> : <FiVolume1 size={18} />}
            </button>
            <button
              className="chat-action-btn"
              onClick={handleExpand}
              title="Expand to full screen"
            >
              <FiMaximize2 size={18} />
            </button>
            <button
              className="chat-action-btn close-btn"
              onClick={onClose}
              title="Close chat"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`chat-message ${msg.type}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="message-bubble">
                <p>{msg.text}</p>
                <span className="message-time">{formatTime(msg.timestamp)}</span>
              </div>

              {msg.type === "bot" && (
                <div className="message-feedback">
                  <button
                    className={`feedback-btn ${msg.feedback === "like" ? "active" : ""}`}
                    onClick={() => handleFeedback(msg.id, "like")}
                    title="Helpful"
                  >
                    <FiThumbsUp size={14} />
                  </button>
                  <button
                    className={`feedback-btn ${msg.feedback === "dislike" ? "active" : ""}`}
                    onClick={() => handleFeedback(msg.id, "dislike")}
                    title="Not helpful"
                  >
                    <FiThumbsDown size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              className="chat-message bot"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="message-bubble typing">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
          />
          <button
            type="submit"
            className="chat-send-btn"
            disabled={!input.trim() || isTyping}
          >
            <FiSend size={18} />
          </button>
        </form>

        {/* Plan Badge */}
        <div className="chat-plan-badge">
          {userPlan === "premium" ? "👑 Premium Member" : "📌 Free Plan"}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatWindow;
