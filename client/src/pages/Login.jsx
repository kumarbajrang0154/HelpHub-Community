import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔐 Normal Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Google Login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const user = jwtDecode(credentialResponse.credential);

      // send to backend (optional)
      const res = await axios.post("/api/auth/google", {
        email: user.email,
        name: user.name,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="bg-[#4b2c5e] text-white p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">CodeHelp Hub.</h1>
            <p className="text-sm text-gray-300">
              Let’s solve coding problems together 🚀
            </p>
          </div>

          <div className="flex justify-center items-center my-10">
            <img
              src="https://illustrations.popsy.co/purple/web-design.svg"
              alt="illustration"
              className="w-60"
            />
          </div>

          <p className="text-xs text-gray-300">
            Built for students, by developers
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2">
            Log in to CodeHelp Hub.
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Welcome back! login with your data
          </p>

          {/* ✅ GOOGLE LOGIN (REAL) */}
          <div className="mb-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Login Failed")}
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-4">
            <hr className="flex-1" />
            <span className="text-gray-400 text-sm">or</span>
            <hr className="flex-1" />
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="flex justify-between text-sm mb-6 text-gray-500">
              <span>Remember me</span>
              <span className="cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-orange-500 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;