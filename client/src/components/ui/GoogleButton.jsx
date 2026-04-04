import React from "react";

const GoogleButton = ({ onClick }) => {
  return (
    <button className="google-btn" onClick={onClick}>
      Continue with Google
    </button>
  );
};

export default GoogleButton;