import { motion } from "framer-motion";

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.article
      className="service-card glass-card"
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25 }}
    >
      <div className="service-icon">
        <Icon size={24} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <span className="service-label">Premium AI Tool</span>
    </motion.article>
  );
};

export default ServiceCard;
