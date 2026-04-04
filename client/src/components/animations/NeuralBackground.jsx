import React from 'react';

const NeuralBackground = ({ children }) => {
  return (
    <div className="relative w-full h-full">
      {/* Add neural network background animation here */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          {/* Neural network visualization */}
        </svg>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default NeuralBackground;
