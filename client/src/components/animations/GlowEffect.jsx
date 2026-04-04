import React from 'react';

const GlowEffect = ({ children, color = 'blue', intensity = 'md' }) => {
  const intensityClasses = {
    low: 'shadow-lg',
    md: 'shadow-2xl',
    high: 'shadow-3xl',
  };
  
  const colorClasses = {
    blue: 'shadow-blue-500/50',
    purple: 'shadow-purple-500/50',
    pink: 'shadow-pink-500/50',
  };
  
  return (
    <div className={`${intensityClasses[intensity]} ${colorClasses[color]}`}>
      {children}
    </div>
  );
};

export default GlowEffect;
