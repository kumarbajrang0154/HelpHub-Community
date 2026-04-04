import React from "react";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../services/firebase";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import AuthLayout from "../../layouts/AuthLayout";
import GoogleButton from "../../components/ui/GoogleButton";

const Login = () => {

  // 🔥 Google Login Handler
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Google User:", user);

      // 👉 Backend call (future)
      /*
      await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          googleId: user.uid,
          profilePic: user.photoURL,
        }),
      });
      */

      alert("Login Successful 🚀");

    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Login Failed ❌");
    }
  };

  return (
    <AuthLayout>
      <Card>
        <h2 className="title">Welcome back</h2>
        <p className="subtitle">Enter your credentials</p>

        <Input label="Email" type="email" />
        <Input label="Password" type="password" />

        <Button>Log in</Button>

        {/* 🔥 Google Login Button */}
        <GoogleButton onClick={handleGoogleLogin} />

        <p className="link-text">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </Card>
    </AuthLayout>
  );
};

export default Login;