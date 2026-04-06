import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheck, FiArrowRight, FiX } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlobalBackButton from "../components/GlobalBackButton";

const Tool = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const serviceData = {
    "ai-pdf-summarizer": {
      title: "AI PDF Summarizer",
      subtitle: "Extract insights instantly from any PDF",
      description: "Turn lengthy documents into clear, actionable summaries. Our AI reads, analyzes, and extracts key points in seconds, saving you hours of reading time.",
      icon: "📄",
      color: "#FF6B6B",
      features: [
        "Instant PDF analysis and summarization",
        "Key points extraction and highlighting",
        "Multi-language document support",
        "Bulk processing for multiple files",
        "Custom summary length control",
        "Export summaries in multiple formats"
      ],
      benefits: [
        { title: "Save 80% Reading Time", desc: "Get summaries in seconds instead of hours" },
        { title: "Never Miss Key Points", desc: "AI highlights all important information automatically" },
        { title: "Understand Complex Docs", desc: "Simplify technical and legal documents" },
        { title: "Work Smarter", desc: "Focus on action items, not reading" }
      ],
      useCases: [
        "Research papers and academic documents",
        "Legal and compliance documents",
        "Business reports and proposals",
        "Technical documentation"
      ],
      plans: [
        { name: "Basic", price: 299, features: ["10 PDFs/month", "Basic summaries", "Email support"] },
        { name: "Pro", price: 499, features: ["100 PDFs/month", "Advanced summaries", "Priority support", "Bulk upload"] },
        { name: "Enterprise", price: "Custom", features: ["Unlimited PDFs", "Custom AI models", "24/7 support", "API access"] }
      ]
    },
    "ai-chatbot-assistant": {
      title: "AI Chatbot Assistant",
      subtitle: "Your 24/7 intelligent learning companion",
      description: "Instant answers to any question. Get accurate, personalized responses powered by advanced AI, available whenever you need help.",
      icon: "💬",
      color: "#4ECDC4",
      features: [
        "Natural language understanding",
        "Instant responses to any question",
        "Learning context awareness",
        "Multi-topic knowledge base",
        "Conversation history tracking",
        "Personalized learning recommendations"
      ],
      benefits: [
        { title: "24/7 Availability", desc: "Get help anytime, anywhere, instantly" },
        { title: "Personalized Responses", desc: "AI learns your level and adapts explanations" },
        { title: "Faster Learning", desc: "Clear explanations in your way of learning" },
        { title: "Build Confidence", desc: "No judgment, ask anything, learn effectively" }
      ],
      useCases: [
        "Homework and assignment help",
        "Concept clarification",
        "Exam preparation",
        "Quick knowledge lookup"
      ],
      plans: [
        { name: "Basic", price: 199, features: ["50 chats/month", "Basic answers", "Email support"] },
        { name: "Pro", price: 399, features: ["Unlimited chats", "Advanced answers", "Priority support", "Context memory"] },
        { name: "Enterprise", price: "Custom", features: ["Custom domains", "Team collaboration", "24/7 support", "API access"] }
      ]
    },
    "voice-doubt-solver": {
      title: "Voice Doubt Solver",
      subtitle: "Ask by speaking, get answers instantly",
      description: "Simply speak your questions naturally. Our AI listens, understands, and provides clear, detailed answers with voice guidance.",
      icon: "🎤",
      color: "#95E1D3",
      features: [
        "Voice input recognition",
        "Natural speech processing",
        "Text-to-speech answers",
        "Multi-accent support",
        "Conversation flow management",
        "Answer clarity levels"
      ],
      benefits: [
        { title: "Hands-Free Learning", desc: "No typing needed, just speak naturally" },
        { title: "Better Understanding", desc: "Hear explanations in clear, natural voice" },
        { title: "Learn While Commuting", desc: "Get help on the go, anytime" },
        { title: "Accessibility", desc: "Perfect for all learning styles and abilities" }
      ],
      useCases: [
        "On-the-go learning",
        "Concept clarification",
        "Quick doubt resolution",
        "Accessible learning"
      ],
      plans: [
        { name: "Basic", price: 249, features: ["30 queries/month", "Basic clarity", "Email support"] },
        { name: "Pro", price: 449, features: ["Unlimited queries", "Advanced clarity", "Priority support", "Voice history"] },
        { name: "Enterprise", price: "Custom", features: ["Custom voices", "Team access", "24/7 support", "API access"] }
      ]
    },
    "project-support-ai": {
      title: "Project Support AI",
      subtitle: "Step-by-step guidance for all your projects",
      description: "Get expert guidance for coding, assignments, and projects. From architecture to debugging, we guide you through every step.",
      icon: "🚀",
      color: "#F38181",
      features: [
        "Project architecture planning",
        "Code review and optimization",
        "Debugging assistance",
        "Best practices guidance",
        "Performance optimization tips",
        "Deployment support"
      ],
      benefits: [
        { title: "Complete Project Guidance", desc: "From planning to deployment, we're with you" },
        { title: "Learn Best Practices", desc: "Understand industry-standard approaches" },
        { title: "Ship Faster", desc: "Reduce development time and errors" },
        { title: "Professional Code Quality", desc: "Write code that scales and maintains easily" }
      ],
      useCases: [
        "Web application development",
        "Mobile app projects",
        "Data science projects",
        "System design"
      ],
      plans: [
        { name: "Basic", price: 399, features: ["10 projects/year", "Basic guidance", "Email support"] },
        { name: "Pro", price: 599, features: ["50 projects/year", "Advanced guidance", "Priority support", "Code review"] },
        { name: "Enterprise", price: "Custom", features: ["Unlimited projects", "Dedicated mentor", "24/7 support", "Custom training"] }
      ]
    },
    "study-assistant": {
      title: "Study Assistant",
      subtitle: "Your personal AI-powered study companion",
      description: "Organize notes, master concepts, and ace exams. Your intelligent study partner adapts to your learning pace and style.",
      icon: "📚",
      color: "#A8D8EA",
      features: [
        "Smart note organization",
        "Concept explanation",
        "Quiz generation",
        "Exam preparation",
        "Study schedule planning",
        "Progress tracking"
      ],
      benefits: [
        { title: "Organized Learning", desc: "Keep all your study materials in one place" },
        { title: "Concept Mastery", desc: "Deep explanations tailored to your level" },
        { title: "Exam Ready", desc: "Practice tests and preparation guidance" },
        { title: "Consistent Progress", desc: "Track improvement and identify weak areas" }
      ],
      useCases: [
        "Exam preparation",
        "Semester course support",
        "Concept revision",
        "Assignment help"
      ],
      plans: [
        { name: "Basic", price: 179, features: ["5 subjects", "Basic organization", "Email support"] },
        { name: "Pro", price: 349, features: ["Unlimited subjects", "Advanced organization", "Priority support", "Quiz generation"] },
        { name: "Enterprise", price: "Custom", features: ["Institutional license", "Analytics", "24/7 support", "Custom curriculum"] }
      ]
    }
  };

  const service = serviceData[serviceName] || serviceData["ai-pdf-summarizer"];
  const title = service.title;

  return (
    <div className="app">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="service-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-icon"
          >
            {service.icon}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="service-title-main"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="service-subtitle-main"
          >
            {service.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="service-description-main"
          >
            {service.description}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="cta-button-primary"
          >
            Get Started Now <FiArrowRight />
          </motion.button>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Core Features</h2>
          <div className="features-grid">
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <FiCheck className="check-icon" />
                <p>{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2>Why Choose This Service?</h2>
          <div className="benefits-grid">
            {service.benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="benefit-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="use-cases-section">
        <div className="container">
          <h2>Perfect For</h2>
          <div className="use-cases-list">
            {service.useCases.map((useCase, idx) => (
              <motion.div
                key={idx}
                className="use-case-item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <FiCheck />
                <span>{useCase}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <h2>Simple, Transparent Pricing</h2>
          <div className="pricing-grid">
            {service.plans.map((plan, idx) => (
              <motion.div
                key={idx}
                className={`pricing-card ${plan.name.toLowerCase() === selectedPlan ? "active" : ""}`}
                onClick={() => setSelectedPlan(plan.name.toLowerCase())}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{plan.name}</h3>
                <div className="price">
                  {typeof plan.price === "number" ? `₹${plan.price}` : plan.price}
                  {typeof plan.price === "number" && <span>/month</span>}
                </div>
                <ul className="features-list">
                  {plan.features.map((feat, i) => (
                    <li key={i}>
                      <FiCheck /> {feat}
                    </li>
                  ))}
                </ul>
                <button className="plan-cta">
                  Choose Plan <FiArrowRight />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="final-cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <h2>Ready to Transform Your Learning?</h2>
          <p>Join thousands of students already using {title} to achieve their goals.</p>
          <button className="cta-button-large">
            Start Your Free Trial Today
          </button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Tool;
