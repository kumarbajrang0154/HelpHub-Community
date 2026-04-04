import React from "react";
import NeuralBackground from "../components/animations/NeuralBackground";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-wrapper">
      <NeuralBackground />
      <div className="auth-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;