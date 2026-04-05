import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram, FiFacebook } from "react-icons/fi";

const iconMap = {
  linkedin: FiLinkedin,
  github: FiGithub,
  instagram: FiInstagram,
  facebook: FiFacebook,
};

const DeveloperCard = ({ image, name, intro, email, social }) => {
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
        <p className="intro">{intro}</p>
        <a className="developer-email" href={`mailto:${email}`}>{email}</a>
      </div>

      <div className="social-row">
        {social && Object.entries(social).map(([platform, url]) => {
          const Icon = iconMap[platform.toLowerCase()] || FiGithub;
          return (
            <a key={platform} href={url} target="_blank" rel="noreferrer" className="social-link">
              <Icon size={18} />
            </a>
          );
        })}
      </div>
    </motion.article>
  );
};

export default DeveloperCard;
