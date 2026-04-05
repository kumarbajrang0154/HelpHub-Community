import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { FiMail, FiLock, FiUser, FiPhone, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { register as registerApi } from "../../services/authApi";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await registerApi(formData.name, formData.email, formData.password);
      console.log("Signup successful:", result);
      login(result, result.token);
      navigate("/services");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = (e) => {
    // Prevent form submission
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    console.log('Google signup initiated...');
    
    // Redirect to backend OAuth route
    const backendUrl = "http://localhost:5000/api/auth/google";
    console.log('Redirecting to:', backendUrl);
    
    try {
      window.location.href = backendUrl;
    } catch (error) {
      console.error('Google signup redirect error:', error);
      setError('Failed to start Google signup. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div
          className="auth-image"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
            alt="Students learning"
          />
          <div className="image-overlay">
            <h2>Join Us Today</h2>
            <p>Start your AI-powered learning journey with AI Platform</p>
          </div>
        </motion.div>

        <motion.div
          className="auth-form"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="form-header">
            <h1>Create Account</h1>
            <p>Join thousands of learners in the AI Platform</p>
          </div>

          {error && (
            <div className="error-message" style={{ 
              backgroundColor: "#fee", 
              color: "#c33", 
              padding: "12px", 
              borderRadius: "4px", 
              marginBottom: "16px",
              fontSize: "14px"
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <FiPhone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button type="button" className="google-btn" onClick={handleGoogleSignup} disabled={loading}>
              <FcGoogle size={20} />
              Sign up with Google
            </button>
          </form>

          <div className="form-footer">
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
