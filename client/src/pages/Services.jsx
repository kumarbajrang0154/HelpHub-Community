import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import BackButton from "../components/BackButton";

const services = [
  {
    name: "AI PDF Summarizer",
    description: "Summarize long PDFs instantly",
    price: "Free",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=80",
    slug: "ai-pdf-summarizer",
  },
  {
    name: "AI Chatbot",
    description: "Ask anything and get AI answers",
    price: "Free",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80",
    slug: "ai-chatbot",
  },
  {
    name: "Voice Doubt Solver",
    description: "Solve doubts using voice input",
    price: "₹49",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=80",
    slug: "voice-doubt-solver",
  },
  {
    name: "Project Support AI",
    description: "Get help with coding projects",
    price: "₹99",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=700&q=80",
    slug: "project-support-ai",
  },
];

const Services = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="services-page-shell">
      <div className="page-inner">
        <BackButton />

        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="eyebrow">Our Services</span>
          <h1>AI services built for student success.</h1>
          <p>
            Explore premium AI tools designed to streamline learning, clarify doubts, and deliver fast project support.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="services-loading">
            <div className="loader" />
            <p>Loading available services...</p>
          </div>
        ) : (
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.name}
                description={service.description}
                price={service.price}
                image={service.image}
                onProceed={() => navigate(`/tool/${service.slug}`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
