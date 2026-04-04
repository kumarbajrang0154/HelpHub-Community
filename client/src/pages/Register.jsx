import { useState } from "react";
import { registerUser } from "../services/authService";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      toast.success("Registered Successfully 🎉");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Register</h2>
        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: { display: "flex", justifyContent: "center", marginTop: "100px" },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "30px",
    background: "#1e293b",
    color: "#fff",
    borderRadius: "10px",
  },
};

export default Register;