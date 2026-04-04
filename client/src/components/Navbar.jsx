import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={{ color: "#3b82f6" }}>CodeHelp Hub</h2>

      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>

        {user && (
          <button onClick={logout} style={styles.btn}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#020617",
    color: "#fff",
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  btn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Navbar;