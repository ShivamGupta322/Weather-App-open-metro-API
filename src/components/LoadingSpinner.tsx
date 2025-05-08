import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mb-2"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner;