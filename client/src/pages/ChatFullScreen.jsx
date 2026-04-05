import React, { useState, useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FiSend, FiArrowLeft, FiThumbsUp, FiThumbsDown, FiTrash2, FiDownload, FiBarChart2, FiVolume2, FiVolume1 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getAIResponse } from "../services/openaiService";
import { playNotificationSound, isSoundEnabled, toggleSoundNotifications } from "../services/audioService";
import { analytics } from "../services/analyticsService";
import { historyService } from "../services/historyService";
import "../styles/chatbot.css";

const ChatFullScreen = () => {
  const [messages, setMessages] = useState(() => {
    const history = historyService.getRecentHistory(50);
    if (history.length === 0) {
      return [
        {
          id: `msg_${Date.now()}`,
          type: "bot",
          text: `👋 Welcome to AI Chat! I'm here to help you with any questions about our platform and services. What would you like to know?`,
          timestamp: new Date(),
          feedback: null,
        },
      ];
    }
    // Convert string timestamps back to Date objects
    return history.map((msg) => ({
      ...msg,
      timestamp: typeof msg.timestamp === "string" ? new Date(msg.timestamp) : msg.timestamp,
      feedback: msg.feedback || null,
    }));
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(isSoundEnabled());
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [sessionStats, setSessionStats] = useState(null);

  const messagesEndRef = useRef(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const userPlan = localStorage.getItem("userPlan") || "free";

  useEffect(() => {
    analytics.trackSession();
    setSessionStats(analytics.getSessionStats());
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

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all chat history?")) {
      historyService.clearHistory();
      setMessages([
        {
          id: `msg_${Date.now()}`,
          type: "bot",
          text: `Chat history cleared. Let's start fresh! 🎉`,
          timestamp: new Date(),
          feedback: null,
        },
      ]);
    }
  };

  const exportHistory = () => {
    historyService.exportHistory();
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
    <div className="chat-fullscreen">
      {/* Header */}
      <div className="chat-fullscreen-header">
        <div className="chat-fullscreen-header-left">
          <div className="chat-avatar-large">AI</div>
          <div>
            <h2>AI Assistant</h2>
            <span className="chat-status">
              <span className="status-dot"></span> Online
            </span>
          </div>
        </div>
        <div className="chat-fullscreen-header-right">
          <button
            className="chat-header-icon-btn sound"
            onClick={toggleSound}
            title={soundEnabled ? "Sound on" : "Sound off"}
          >
            {soundEnabled ? <FiVolume2 size={20} /> : <FiVolume1 size={20} />}
          </button>
          <button
            className="chat-header-icon-btn"
            onClick={() => setShowAnalytics(!showAnalytics)}
            title="View analytics"
          >
            <FiBarChart2 size={20} />
          </button>
          <button
            className="chat-header-icon-btn"
            onClick={exportHistory}
            title="Export chat history"
          >
            <FiDownload size={20} />
          </button>
          <button
            className="chat-header-icon-btn danger"
            onClick={clearHistory}
            title="Clear chat history"
          >
            <FiTrash2 size={20} />
          </button>
          <div className="chat-plan-badge-large">
            {userPlan === "premium" ? "👑 Premium" : "📌 Free"}
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      {showAnalytics && sessionStats && (
        <motion.div
          className="analytics-dashboard"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="analytics-grid">
            <div className="analytics-card">
              <span className="stat-label">Total Messages</span>
              <span className="stat-value">{sessionStats.totalMessages}</span>
            </div>
            <div className="analytics-card">
              <span className="stat-label">Your Messages</span>
              <span className="stat-value">{sessionStats.totalUserMessages}</span>
            </div>
            <div className="analytics-card">
              <span className="stat-label">Bot Responses</span>
              <span className="stat-value">{sessionStats.totalBotMessages}</span>
            </div>
            <div className="analytics-card">
              <span className="stat-label">Positive Feedback</span>
              <span className="stat-value positive">{sessionStats.positiveRatings}</span>
            </div>
            <div className="analytics-card">
              <span className="stat-label">Negative Feedback</span>
              <span className="stat-value negative">{sessionStats.negativeRatings}</span>
            </div>
            <div className="analytics-card">
              <span className="stat-label">Sessions</span>
              <span className="stat-value">{sessionStats.totalSessions}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Chat Container */}
      <div className="chat-fullscreen-container">
        {/* Sidebar (Optional) */}
        <div className="chat-sidebar">
          <div className="sidebar-header">
            <h3>Quick Links</h3>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-item">
              <span className="sidebar-dot"></span>
              Services Overview
            </div>
            <div className="sidebar-item">
              <span className="sidebar-dot"></span>
              Pricing Plans
            </div>
            <div className="sidebar-item">
              <span className="sidebar-dot"></span>
              How to Use
            </div>
            {userPlan === "premium" && (
              <div className="sidebar-item premium">
                <span className="sidebar-dot"></span>
                Premium Features
              </div>
            )}
          </div>

          <div className="sidebar-header" style={{ marginTop: "24px" }}>
            <h3>Chat Info</h3>
          </div>
          <div className="sidebar-info">
            <p>
              <strong>Total Messages:</strong> {historyService.getMessageCount()}
            </p>
            <p>
              <strong>Today's Chat:</strong> {historyService.getTodaysMessages().length}
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="chat-fullscreen-messages">
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
      </div>

      {/* Input Area */}
      <form className="chat-fullscreen-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="chat-fullscreen-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
        />
        <button
          type="submit"
          className="chat-fullscreen-send-btn"
          disabled={!input.trim() || isTyping}
        >
          <FiSend size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatFullScreen;
