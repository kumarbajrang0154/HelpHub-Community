import { Link } from "react-router-dom";
import { FaHome, FaClipboardList } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>CodeHelp 🚀</h2>

      <Link to="/dashboard" style={styles.link}>
        <FaHome /> Dashboard
      </Link>

      <Link to="/dashboard" style={styles.link}>
        <FaClipboardList /> Requests
      </Link>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    background: "#020617",
    height: "100vh",
    padding: "20px",
  },
  logo: {
    color: "#3b82f6",
    marginBottom: "30px",
  },
  link: {
    display: "flex",
    gap: "10px",
    color: "#fff",
    marginBottom: "15px",
    textDecoration: "none",
  },
};

export default Sidebar;