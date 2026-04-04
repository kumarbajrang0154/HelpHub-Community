import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../services/firebase";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import AuthLayout from "../../layouts/AuthLayout";
import GoogleButton from "../../components/ui/GoogleButton";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Token store
    localStorage.setItem("token", "dummy_token_123");

    alert("Login Successful 🚀");

    // ✅ FIXED REDIRECT
    navigate("/");
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log(user);

      // ✅ Token store (important)
      localStorage.setItem("token", user.uid);

      // ✅ FIXED REDIRECT
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Google Login Failed");
    }
  };

  return (
    <AuthLayout>
      <Card>
        <h2 className="title">Welcome back</h2>
        <p className="subtitle">Enter your credentials</p>

        <form onSubmit={handleLogin}>
          <Input label="Email" type="email" required />
          <Input label="Password" type="password" required />

          <Button type="submit">Log in</Button>
        </form>

        <GoogleButton onClick={handleGoogleLogin} />

        <p className="link-text">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </Card>
    </AuthLayout>
  );
};

export default Login;