import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const ServiceCard = ({ icon: Icon, title, description, price, onProceed }) => {
  return (
    <motion.div
      className="service-card"
      whileHover={{ translateY: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Icon Container */}
      <div className="service-icon-container">
        <div className="service-icon">
          {Icon && <Icon size={24} />}
        </div>
      </div>

      {/* Title */}
      <h3 className="service-title">{title}</h3>

      {/* Description */}
      <p className="service-description">{description}</p>

      {/* Price */}
      {price && <div className="service-price">{price}</div>}

      {/* CTA Button */}
      <motion.button
        className="service-cta"
        onClick={onProceed}
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Get Started</span>
        <FiArrowRight size={16} />
      </motion.button>
    </motion.div>
  );
};

export default ServiceCard;
