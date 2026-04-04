import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import AuthLayout from "../../layouts/AuthLayout";

const Register = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // 📍 Auto location fetch
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

  return (
    <AuthLayout>
      <Card>
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Start your journey</p>

        <Input label="Full Name" />

        {/* 📍 Address with auto fetch */}
        <div className="address-box">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <span>Address</span>
          <button className="loc-btn" onClick={handleLocation}>
            📍
          </button>
        </div>

        {/* 📱 Phone with country code */}
        <div className="phone-box">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="+91">🇮🇳 +91</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+61">🇦🇺 +61</option>
          </select>

          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <Input label="Email" type="email" />
        <Input label="Password" type="password" />

        <Button>Sign Up</Button>

        <p className="link-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </Card>
    </AuthLayout>
  );
};

export default Register;