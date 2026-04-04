import { motion } from "framer-motion";

const Home = () => {
  return (
    <div style={styles.page}>
      
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={styles.hero}
      >
        <h1 style={styles.title}>
          CodeHelp Hub 🚀
        </h1>

        <p style={styles.subtitle}>
          Get help with Java, Web Dev & Projects instantly 💻
        </p>

        <button style={styles.btn}>
          Get Started
        </button>
      </motion.div>

      {/* FEATURES */}
      <div style={styles.features}>
        {features.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            style={styles.card}
          >
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

const features = [
  {
    title: "💻 Project Help",
    desc: "Get help in Java, React & Full Stack Projects",
  },
  {
    title: "🐞 Bug Fixing",
    desc: "Fix errors quickly with expert support",
  },
  {
    title: "📚 Assignment Help",
    desc: "Complete your assignments faster",
  },
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "#fff",
    padding: "40px",
  },
  hero: {
    textAlign: "center",
    marginTop: "60px",
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: "10px",
    fontSize: "18px",
    opacity: 0.8,
  },
  btn: {
    marginTop: "20px",
    padding: "12px 25px",
    background: "#3b82f6",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "80px",
    flexWrap: "wrap",
  },
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    width: "250px",
    textAlign: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
  },
};

export default Home;