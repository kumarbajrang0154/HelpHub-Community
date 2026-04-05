import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import DeveloperCard from "../components/DeveloperCard";
import Workflow from "../components/Workflow";
import Contact from "../components/Contact";
import { FiArrowRight, FiPlay, FiUsers, FiBookOpen, FiTrendingUp, FiAward, FiCheckCircle } from "react-icons/fi";

const Home = () => {
  const services = [
    {
      icon: FiBookOpen,
      title: "AI PDF Summarizer",
      description: "Summarize lengthy PDFs instantly with our advanced AI technology."
    },
    {
      icon: FiUsers,
      title: "AI Chatbot",
      description: "Get instant answers and assistance from our intelligent chatbot."
    },
    {
      icon: FiTrendingUp,
      title: "Voice Doubt Solver",
      description: "Ask questions verbally and get accurate solutions in real-time."
    },
    {
      icon: FiAward,
      title: "Project Support",
      description: "Receive personalized help and guidance for your projects."
    }
  ];

  const workflow = [
    {
      step: "01",
      title: "Register",
      description: "Create your account to access all AI tools."
    },
    {
      step: "02",
      title: "Login",
      description: "Sign in securely with email or Google."
    },
    {
      step: "03",
      title: "Choose Service",
      description: "Select from our range of AI-powered services."
    },
    {
      step: "04",
      title: "Use AI Tools",
      description: "Interact with our advanced AI features."
    },
    {
      step: "05",
      title: "Get Results",
      description: "Receive accurate and instant results."
    }
  ];

  const developers = [
    {
      name: "Bajrang Kumar Chaurasiya",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      intro: "AI enthusiast and developer passionate about creating innovative solutions for students.",
      email: "kumarbajrang325@gmail.com",
      social: {
        linkedin: "#",
        instagram: "#",
        facebook: "#"
      }
    },
    {
      name: "Raj Patel",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      intro: "Full-stack developer focused on building scalable and user-friendly applications.",
      email: "23cs138@kpriet.ac.in",
      social: {
        linkedin: "#",
        instagram: "#",
        facebook: "#"
      }
    },
    {
      name: "Amar Kumar Pandit",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
      intro: "Product designer dedicated to crafting intuitive and engaging user experiences.",
      email: "23cs139@kpriet.ac.in",
      social: {
        linkedin: "#",
        instagram: "#",
        facebook: "#"
      }
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="section-container">
          <div className="section-left">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="hero-title">
                Get where you're going faster with <span className="gradient-text">AI Platform</span>
              </h1>
              <p className="hero-subtitle">
                Revolutionize your learning experience with our cutting-edge AI tools designed specifically for students.
              </p>
              <div className="hero-actions">
                <button className="primary-btn" onClick={() => scrollToSection('services')}>
                  Start Now <FiArrowRight size={20} />
                </button>
                <button className="ghost-btn" onClick={() => scrollToSection('contact')}>
                  Contact
                </button>
              </div>
            </motion.div>
          </div>
          <div className="section-right">
            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="hero-image">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
                  alt="Students learning"
                />
              </div>
              <div className="floating-cards">
                <motion.div className="floating-card card-1" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                  AI Chat
                </motion.div>
                <motion.div className="floating-card card-2" animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                  PDF Summarizer
                </motion.div>
                <motion.div className="floating-card card-3" animate={{ y: [0, -15, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
                  Voice Help
                </motion.div>
                <motion.div className="floating-card card-4" animate={{ y: [0, 12, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>
                  Project Support
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="section-container">
          <div className="section-left">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Our Services</h2>
              <p>Comprehensive AI-powered tools designed to enhance your learning experience.</p>
            </motion.div>
          </div>
          <div className="section-right">
            <div className="services-grid">
              {services?.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <Workflow steps={workflow} />

      {/* Developers Section */}
      <section id="developers" className="developers-section">
        <div className="section-container">
          <div className="section-left">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Developers</h2>
              <p>Meet the team behind AI Platform.</p>
            </motion.div>
          </div>
          <div className="section-right">
            <div className="developer-grid">
              {developers?.map((developer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <DeveloperCard {...developer} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Contact />

      <Footer />
    </div>
  );
};

export default Home;