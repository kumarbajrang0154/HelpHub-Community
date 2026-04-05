import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { login as loginApi } from "../../services/authApi";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const result = await loginApi(formData.email, formData.password);
      console.log("Login successful:", result);
      login(result, result.token);
      navigate("/services");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = (e) => {
    // Prevent form submission
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    console.log('Google login initiated...');
    
    // Redirect to backend OAuth route
    const backendUrl = "http://localhost:5000/api/auth/google";
    console.log('Redirecting to:', backendUrl);
    
    try {
      window.location.href = backendUrl;
    } catch (error) {
      console.error('Google login redirect error:', error);
      setError('Failed to start Google login. Please try again.');
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
            <h2>Welcome Back</h2>
            <p>Continue your learning journey with Edvance Platform</p>
          </div>
        </motion.div>

        <motion.div
          className="auth-form"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="form-header">
            <h1>Sign In</h1>
            <p>Access your AI-powered learning workspace</p>
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
              <label>Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
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
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button type="button" className="google-btn" onClick={handleGoogleLogin} disabled={loading}>
              <FcGoogle size={20} />
              Continue with Google
            </button>
          </form>

          <div className="form-footer">
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
