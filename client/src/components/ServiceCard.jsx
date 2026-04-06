import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const ServiceCard = ({ icon: Icon, title, description, label, onProceed }) => {
  return (
    <motion.div
      className="service-card"
      whileHover={{ translateY: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Icon */}
      <div className="service-icon">
        {Icon && <Icon size={28} />}
      </div>

      {/* Label Badge */}
      {label && (
        <div className="service-label-badge">
          {label}
        </div>
      )}

      {/* Title */}
      <h3 className="service-heading">{title}</h3>

      {/* Description */}
      <p className="service-text">{description}</p>

      {/* CTA Button */}
      <motion.button
        className="service-cta"
        onClick={onProceed}
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Get Started</span>
        <FiArrowRight size={18} />
      </motion.button>
    </motion.div>
  );
};

export default ServiceCard;
