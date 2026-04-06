import React from "react";
import { motion } from "framer-motion";
import "../styles/loading.css";

export const LoadingSpinner = ({ size = "medium", color = "primary" }) => {
  const sizeMap = {
    small: 20,
    medium: 32,
    large: 48,
  };

  return (
    <motion.div
      className={`loading-spinner loading-spinner-${color}`}
      style={{ width: sizeMap[size], height: sizeMap[size] }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="spinner-ring" />
      <div className="spinner-ring" />
      <div className="spinner-ring" />
    </motion.div>
  );
};

export const LoadingDots = ({ size = "medium" }) => {
  const sizeMap = {
    small: 4,
    medium: 6,
    large: 8,
  };

  const dotSize = sizeMap[size];

  return (
    <div className="loading-dots">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="loading-dot"
          style={{ width: dotSize, height: dotSize }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export const LoadingSkeleton = ({ width, height, borderRadius = 8, className = "" }) => {
  return (
    <motion.div
      className={`loading-skeleton ${className}`}
      style={{ width, height, borderRadius }}
      animate={{
        background: [
          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
          "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        ],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export const PageLoader = ({ message = "Loading..." }) => {
  return (
    <motion.div
      className="page-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loader-content">
        <LoadingSpinner size="large" />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
};

export const ButtonLoader = ({ size = "small" }) => {
  return <LoadingSpinner size={size} color="white" />;
};
