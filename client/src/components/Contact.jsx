import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiClock, FiLinkedin, FiInstagram, FiFacebook } from "react-icons/fi";

const contactItems = [
  {
    icon: FiPhone,
    title: "Phone",
    detail: "+917859058589",
  },
  {
    icon: FiMail,
    title: "Email",
    detail: "kumarbajrang325@gmail.com",
  },
  {
    icon: FiMapPin,
    title: "Address",
    detail: "KPR Institute of Engineering and Technology, Coimbatore",
  },
  {
    icon: FiClock,
    title: "Working Hours",
    detail: "Mon–Sat (9AM–7PM)",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="section-left">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Contact Us</h2>
            <p>Get in touch with us for any questions or support.</p>
          </motion.div>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="contact-item">
                  <div className="contact-item-header">
                    <Icon className="contact-icon" />
                    <h4>{item.title}</h4>
                  </div>
                  <p className="contact-item-detail">{item.detail}</p>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="section-right">
          <motion.div
            className="contact-visual"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="contact-image">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80"
                alt="Contact us"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
