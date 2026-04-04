import React from 'react';

const Loader = ({ size = 'md', color = 'blue' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  
  const colors = {
    blue: 'border-blue-500',
    white: 'border-white',
    gray: 'border-gray-500',
  };
  
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} ${colors[color]} border-4 border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loader;
