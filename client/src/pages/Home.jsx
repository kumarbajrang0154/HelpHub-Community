import { motion } from "framer-motion";
import { ArrowRight, Cpu, FileText, Mic, MessageCircle, Mail, Phone } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import DeveloperCard from "../components/DeveloperCard";

const services = [
  {
    icon: MessageCircle,
    title: "AI Study Coach",
    description: "Instantly ask study questions, receive concise explanations, and keep your learning momentum going.",
  },
  {
    icon: FileText,
    title: "PDF AI Tutor",
    description: "Upload notes, lectures, or textbooks and get smart summaries, flashcards, and topic insights.",
  },
  {
    icon: Mic,
    title: "Voice Help",
    description: "Ask questions by voice, receive hands-free guidance, and stay focused on the task.",
  },
  {
    icon: Cpu,
    title: "Smart Planner",
    description: "Build a personalized study plan, stay on schedule, and track your academic momentum.",
  },
];

const workflow = [
  {
    title: "Register",
    description: "Create your secure student workspace and choose your profile in seconds.",
  },
  {
    title: "Login",
    description: "Access your personalized AI dashboard from any device and continue where you left off.",
  },
  {
    title: "Choose Service",
    description: "Select the right AI tool for homework, studying, note review, or voice coaching.",
  },
  {
    title: "Use AI Tool",
    description: "Apply a powerful workflow to accelerate learning, assignments, or exam prep.",
  },
];

const developers = [
  {
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
    name: "Aarya Singh",
    role: "Product Design Lead",
    email: "aarya@novamind.ai",
    socials: [
      { type: "linkedin", url: "https://www.linkedin.com" },
      { type: "facebook", url: "https://www.facebook.com" },
      { type: "instagram", url: "https://www.instagram.com" },
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    name: "Noah Patel",
    role: "AI Engineer",
    email: "noah@novamind.ai",
    socials: [
      { type: "linkedin", url: "https://www.linkedin.com" },
      { type: "facebook", url: "https://www.facebook.com" },
      { type: "instagram", url: "https://www.instagram.com" },
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    name: "Mila Chen",
    role: "Growth Strategist",
    email: "mila@novamind.ai",
    socials: [
      { type: "linkedin", url: "https://www.linkedin.com" },
      { type: "facebook", url: "https://www.facebook.com" },
      { type: "instagram", url: "https://www.instagram.com" },
    ],
  },
];

const Home = () => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page-shell">
      <Navbar />

      <motion.section
        id="hero"
        className="section hero-section"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">AI-powered student platform</span>
            <h1>The next generation of study tools for every learner.</h1>
            <p>
              NovaMind brings AI chat, PDF tutoring, voice guidance, and productivity planning into one premium
              learning experience.
            </p>

            <div className="hero-actions">
              <button className="primary-btn" onClick={() => scrollTo("services")}>
                Start Now
                <ArrowRight size={18} />
              </button>
              <button className="ghost-btn" onClick={() => scrollTo("contact")}>Contact</button>
            </div>

            <div className="hero-metrics">
              <div className="metric">
                <strong>4.9/5</strong>
                <span>Student satisfaction</span>
              </div>
              <div className="metric">
                <strong>120K</strong>
                <span>Active learners</span>
              </div>
              <div className="metric">
                <strong>24/7</strong>
                <span>AI support</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-frame">
              <img
                className="hero-image"
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80"
                alt="Student using learning dashboard"
              />

              <motion.div
                className="floating-card floating-card-1"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="floating-icon">
                  <MessageCircle size={18} />
                </div>
                <span className="card-label">Live study chat</span>
                <p className="card-title">AI Chat</p>
                <p className="card-copy">Ask questions, review feedback, and learn instantly.</p>
              </motion.div>

              <motion.div
                className="floating-card floating-card-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="floating-icon">
                  <FileText size={18} />
                </div>
                <span className="card-label">Document tutor</span>
                <p className="card-title">PDF AI</p>
                <p className="card-copy">Upload notes for summaries, questions, and highlights.</p>
              </motion.div>

              <motion.div
                className="floating-card floating-card-3"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="floating-icon">
                  <Mic size={18} />
                </div>
                <span className="card-label">Voice-guided help</span>
                <p className="card-title">Voice Help</p>
                <p className="card-copy">Speak naturally and receive instant study assistance.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="services"
        className="section services-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="section-header">
          <span className="section-label">Our Services</span>
          <h2 className="section-title">Premium tools for every student workflow.</h2>
          <p className="section-copy">
            Designed to feel delightful, fast, and intuitive across every screen — from study planning to assignment support.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <ServiceCard key={service.title} icon={service.icon} title={service.title} description={service.description} />
          ))}
        </div>
      </motion.section>

      <motion.section
        id="workflow"
        className="section workflow-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="section-header">
          <span className="section-label">How it works</span>
          <h2 className="section-title">Study in four effortless steps.</h2>
          <p className="section-copy">
            A clean, modern workflow that keeps learning simple and progress measurable from day one.
          </p>
        </div>

        <div className="workflow-track">
          <div className="workflow-line" />
          <div className="workflow-items">
            {workflow.map((item, index) => (
              <motion.div
                key={item.title}
                className="workflow-step glass-card"
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <span className="step-number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="developers"
        className="section developers-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="section-header">
          <span className="section-label">Team</span>
          <h2 className="section-title">Meet the people behind NovaMind.</h2>
          <p className="section-copy">
            Crafted by designers, engineers, and learning experts with one goal: empower every student through beautiful AI.
          </p>
        </div>

        <div className="developer-grid">
          {developers.map((developer) => (
            <DeveloperCard key={developer.name} {...developer} />
          ))}
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="section contact-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="contact-grid">
          <div className="contact-panel">
            <span className="section-label">Contact</span>
            <h2 className="section-title">Let’s answer your learning questions.</h2>
            <p className="section-copy">
              Reach out for custom onboarding, campus support, or a quick demo of NovaMind's premium AI study tools.
            </p>

            <div className="contact-details">
              <div className="detail-card">
                <strong>Phone</strong>
                <span>+1 (800) 555-0123</span>
              </div>
              <div className="detail-card">
                <strong>Email</strong>
                <span>hello@novamind.ai</span>
              </div>
              <div className="detail-card">
                <strong>Address</strong>
                <span>512 Innovation Blvd, San Francisco, CA</span>
              </div>
            </div>

            <div className="contact-links">
              <a className="contact-link" href="mailto:hello@novamind.ai">
                <Mail size={18} /> Email us
              </a>
              <a className="contact-link" href="tel:+18005550123">
                <Phone size={18} /> Call support
              </a>
            </div>
          </div>

          <div className="contact-visual">
            <div className="contact-frame">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80"
                alt="Team member helping a student"
              />
            </div>
          </div>
        </div>
      </motion.section>

      <section className="section footer-section">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
