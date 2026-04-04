import React from "react";

const ServiceCard = ({ title, desc }) => {
  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
};

export default ServiceCard;