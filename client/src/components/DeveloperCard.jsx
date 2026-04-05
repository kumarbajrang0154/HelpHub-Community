import { motion } from "framer-motion";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";

const iconMap = {
  linkedin: FiLinkedin,
  facebook: FiFacebook,
  instagram: FiInstagram,
};

const DeveloperCard = ({ image, name, role, email, socials }) => {
  return (
    <motion.article
      className="developer-card glass-card"
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25 }}
    >
      <img className="avatar" src={image} alt={name} />
      <div className="developer-copy">
        <h3>{name}</h3>
        <p>{role}</p>
        <a className="developer-email" href={`mailto:${email}`}>{email}</a>
      </div>

      <div className="social-row">
        {socials.map((item) => {
          const Icon = iconMap[item.type];
          return (
            <a key={item.type} href={item.url} target="_blank" rel="noreferrer" className="social-link">
              <Icon size={18} />
            </a>
          );
        })}
      </div>
    </motion.article>
  );
};

export default DeveloperCard;
