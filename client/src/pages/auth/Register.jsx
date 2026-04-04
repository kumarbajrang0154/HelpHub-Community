import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../services/firebase";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import AuthLayout from "../../layouts/AuthLayout";
import GoogleButton from "../../components/ui/GoogleButton";

const Register = () => {
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // 📍 Auto location
  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        setAddress(data.display_name);
      } catch (err) {
        console.log(err);
        alert("Failed to fetch address");
      }
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!phone || !address) {
      alert("Please fill all fields ❌");
      return;
    }

    const fullPhone = `${countryCode}${phone}`;
    console.log(fullPhone, address);

    // ✅ Token store
    localStorage.setItem("token", "dummy_token_123");

    alert("Signup Successful 🚀");

    // ✅ FIXED REDIRECT
    navigate("/");
  };

  // 🔥 Google Signup
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log(user);

      // ✅ Token store
      localStorage.setItem("token", user.uid);

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Google Signup Failed");
    }
  };

  return (
    <AuthLayout>
      <Card>
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Start your journey</p>

        <form onSubmit={handleSignup}>
          <Input label="Full Name" required />

          {/* 📍 Address */}
          <div className="address-box">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <span>Address</span>
            <button
              type="button"
              className="loc-btn"
              onClick={handleLocation}
            >
              📍
            </button>
          </div>

          {/* 📱 Phone */}
          <div className="phone-box">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+977">🇳🇵 +977</option>
            </select>

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <Input label="Email" type="email" required />
          <Input label="Password" type="password" required />

          <Button type="submit">Sign Up</Button>
        </form>

        {/* Google Signup */}
        <GoogleButton onClick={handleGoogleSignup} />

        <p className="link-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Card>
    </AuthLayout>
  );
};

export default Register;