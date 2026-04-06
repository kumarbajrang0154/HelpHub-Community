import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "../../services/axios";
import { getProfile } from "../../services/authApi";
import { FiBookmark, FiClock, FiCheckCircle } from "react-icons/fi";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const profileData = await getProfile();
        setUser(profileData);

        // Fetch user requests
        const res = await axios.get("/api/request/my");

        // ✅ SAFE CHECK
        if (res?.data?.requests) {
          setRequests(res.data.requests);
        } else {
          setRequests([]);
        }

      } catch (err) {
        console.error("API ERROR:", err);

        // ✅ show error instead of white screen
        setError(
          err?.response?.data?.message || err.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FiCheckCircle size={18} className="text-green-400" />;
      case "pending":
        return <FiClock size={18} className="text-yellow-400" />;
      default:
        return <FiBookmark size={18} className="text-blue-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "status-completed";
      case "pending":
        return "status-pending";
      default:
        return "status-default";
    }
  };

  return (
    <div className="app">
      <Navbar />

      <section className="hero-section dashboard-section">
        <div className="section-container">
          
          {/* 🎯 ERROR STATE */}
          {error && !loading && (
            <motion.div
              className="error-alert"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p>⚠️ {error}</p>
            </motion.div>
          )}

          {/* ⏳ LOADING STATE */}
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading your dashboard...</p>
            </div>
          )}

          {/* 👤 USER PROFILE SECTION */}
          {!loading && user && (
            <motion.div
              className="dashboard-profile-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="profile-header">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name || "User"
                  )}&background=0f172a&color=38bdf8&rounded=true&size=100`}
                  alt="Profile"
                  className="profile-avatar"
                />
                <div className="profile-details">
                  <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}! 👋</h1>
                  <p className="text-gray-400">📧 {user.email}</p>
                  <p className="text-gray-500 text-sm">
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 📋 REQUESTS SECTION */}
          <motion.div
            className="dashboard-requests-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="section-subtitle mb-6">Your Requests</h2>

            {!loading && !error && requests.length === 0 && (
              <div className="empty-state">
                <FiBookmark size={48} />
                <p>No requests yet. Start by making your first request!</p>
              </div>
            )}

            {!loading && !error && requests.length > 0 && (
              <div className="requests-grid">
                {requests.map((req, index) => (
                  <motion.div
                    key={req._id}
                    className="request-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="request-header">
                      <h3 className="request-title">{req.title || "Untitled Request"}</h3>
                      <div className={`request-status ${getStatusColor(req.status)}`}>
                        {getStatusIcon(req.status)}
                        <span className="capitalize ml-2">{req.status || "pending"}</span>
                      </div>
                    </div>

                    <p className="request-description">
                      {req.description || "No description provided"}
                    </p>

                    <div className="request-footer">
                      <span className="request-date">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </span>
                      <span className="request-id">ID: {req._id.slice(0, 8)}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;