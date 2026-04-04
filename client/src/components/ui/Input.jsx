import React from "react";

const Input = ({ label, type = "text", ...props }) => {
  return (
    <div className="input-box">
      <input type={type} required {...props} />
      <span>{label}</span>
    </div>
  );
};

export default Input;