// Spinner.js
import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader w-12 h-12 border-2 border-transparent border-t-2 border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
