import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FiStar,
  FiBookOpen,
  FiUsers,
  FiTrendingUp,
  FiAward
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import { useToast } from "../components/Toast";
import { AuthContext } from "../context/AuthContext";
import { getProfile } from "../services/authApi";

const Services = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { success } = useToast();
  const { login } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  // Define services with meaningful data
  const services = [
    {
      icon: FiBookOpen,
      title: "AI PDF Summarizer",
      description: "Instantly summarize lengthy PDFs and documents. Extract key points, save time, and understand complex information in seconds.",
      slug: "ai-pdf-summarizer"
    },
    {
      icon: FiUsers,
      title: "AI Chatbot Assistant",
      description: "Get instant answers to any question. Our intelligent chatbot provides accurate responses 24/7 to help you learn faster.",
      slug: "ai-chatbot-assistant"
    },
    {
      icon: FiTrendingUp,
      title: "Voice Doubt Solver",
      description: "Ask questions by speaking naturally. Our AI understands your doubts and provides clear, detailed solutions instantly.",
      slug: "voice-doubt-solver"
    },
    {
      icon: FiAward,
      title: "Project Support AI",
      description: "Receive step-by-step guidance for your projects, coding challenges, and assignments. Get expert help when you need it most.",
      slug: "project-support-ai"
    },
    {
      icon: FiStar,
      title: "Study Assistant",
      description: "Your personal study companion offering notes organization, concept explanations, exam preparation, and personalized learning paths.",
      slug: "study-assistant"
    }
  ];

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("authToken", token);

      const fetchUser = async () => {
        try {
          const userData = await getProfile();
          localStorage.setItem("user", JSON.stringify(userData));
          login(userData, token);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      };

      fetchUser();
      navigate("/services", { replace: true });
    }

    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchParams, navigate, login]);

  const handleServiceClick = (service) => {
    success(`Launching ${service.title}...`);
    setTimeout(() => {
      navigate(`/tool/${service.slug}`);
    }, 500);
  };

  return (
    <div className="app">
      <Navbar />

      {/* Services Hero Section */}
      <section className="hero-section services-hero-section">
        <div className="section-container">
          {/* Left Side - Content */}
          <div className="section-left services-hero-left">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="eyebrow">
                <FiStar size={16} />
                <span>Premium AI Suite</span>
              </div>

              <h1 className="hero-title">
                Explore Our <span className="gradient-text">AI Services</span>
              </h1>

              <p className="hero-subtitle">
                Unlock your potential with our comprehensive suite of AI-powered tools designed to supercharge your productivity and learning experience.
              </p>
            </motion.div>
          </div>

          {/* Right Side - Circular Floating Cards */}
          <div className="section-right services-hero-right">
            <motion.div
              className="hero-visual services-visual"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {/* Premium Animated Background */}
              <div className="services-bg-animation">
                <motion.div
                  className="floating-orb orb-1"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="floating-orb orb-2"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>

              {/* Circular Floating Cards */}
              <div className="floating-cards services-floating">
                <motion.div
                  className="floating-card card-1"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FiBookOpen size={20} />
                  <span>PDF AI</span>
                </motion.div>

                <motion.div
                  className="floating-card card-2"
                  animate={{
                    y: [0, 12, 0],
                    rotate: [0, -1, 0]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <FiUsers size={20} />
                  <span>ChatBot</span>
                </motion.div>

                <motion.div
                  className="floating-card card-3"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <FiTrendingUp size={20} />
                  <span>Voice</span>
                </motion.div>

                <motion.div
                  className="floating-card card-4"
                  animate={{
                    y: [0, 8, 0],
                    rotate: [0, -2, 0]
                  }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                >
                  <FiAward size={20} />
                  <span>Projects</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="services-grid-section">
        <div className="container">
          {/* Section Header */}
          <motion.div
            className="section-intro"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Our AI Services</h2>
            <p className="section-copy">
              Smart tools designed to boost your productivity and learning. Choose the service that works best for you.
            </p>
          </motion.div>

          {/* Services Grid - 3+2 Layout */}
          <motion.div
            className="services-grid-container"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Cards 1, 2, 3 - in grid */}
            {services.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.slug || index}
                className="service-card-wrapper"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  onProceed={() => handleServiceClick(service)}
                />
              </motion.div>
            ))}

            {/* Cards 4, 5 - centered in second row */}
            <div className="services-row-2-wrapper">
              {services.slice(3, 5).map((service, index) => (
                <motion.div
                  key={service.slug || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    onProceed={() => handleServiceClick(service)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Services;
