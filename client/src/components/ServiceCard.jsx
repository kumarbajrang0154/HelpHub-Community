import { motion } from "framer-motion";

const ServiceCard = ({ icon: Icon, image, title, description, price, onProceed }) => {
  return (
    <motion.article
      className="service-card"
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25 }}
    >
      {image ? (
        <img className="service-image" src={image} alt={title} />
      ) : (
        <div className="service-card-top">
          <div className="service-icon">{Icon ? <Icon size={24} /> : null}</div>
          <span className="service-label">Premium AI Tool</span>
        </div>
      )}

      <div className="service-card-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="service-card-footer">
        <span className="service-price">{price || "Premium"}</span>
        {onProceed ? (
          <button className="service-action" type="button" onClick={onProceed}>
            Try Now
          </button>
        ) : null}
      </div>
    </motion.article>
  );
};

export default ServiceCard;
