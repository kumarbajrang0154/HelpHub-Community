import { FiLinkedin, FiFacebook, FiInstagram } from "react-icons/fi";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-shell">
      <div className="footer-grid">
        <div className="footer-column footer-brand">
          <h3>Edvance Platform</h3>
          <p className="footer-tagline">
            AI-powered student workspace for faster learning and smarter growth.
          </p>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <nav className="footer-links">
            <a href="#hero">Home</a>
            <a href="#services">Services</a>
            <a href="#workflow">Workflow</a>
            <a href="#developers">Developers</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <div className="footer-column">
          <h4>Resources</h4>
          <nav className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Support</a>
            <a href="#">FAQ</a>
          </nav>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="footer-social-row">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FiLinkedin size={20} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FiFacebook size={20} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FiInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Edvance Platform</span>
        <span>Designed for modern student growth</span>
      </div>
    </footer>
  );
};

export default Footer;
