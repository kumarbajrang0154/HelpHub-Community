import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div style={styles.top}>
      <span>Welcome, {user?.name}</span>
      <button onClick={logout} style={styles.btn}>Logout</button>
    </div>
  );
};

const styles = {
  top: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 20px",
    background: "#020617",
  },
  btn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
  },
};

export default Topbar;