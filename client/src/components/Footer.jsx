import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="footer-content glass-card">
      <div className="footer-brand">
        <h3>NovaMind</h3>
        <p>Premium AI student workspace for learning faster, staying organized, and mastering every course.</p>
      </div>

      <div className="footer-links">
        <span className="footer-heading">Quick links</span>
        <a href="#hero">Home</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </div>

      <div className="footer-socials">
        <span className="footer-heading">Follow us</span>
        <div className="footer-social-row">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FiLinkedin size={18} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FiFacebook size={18} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FiInstagram size={18} />
          </a>
        </div>
      </div>

      <p className="footer-copy">© 2026 NovaMind. All rights reserved. Designed for modern student growth.</p>
    </div>
  );
};

export default Footer;
