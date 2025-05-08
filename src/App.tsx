import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Sun, Moon } from 'lucide-react';
import WeatherDashboard from './components/WeatherDashboard';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <header className="p-4 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Weather Dashboard</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <WeatherDashboard />
      </main>
      
      <footer className="mt-auto py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <div className="container mx-auto">
          <p>Weather data provided by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Open-Meteo</a></p>
        </div>
      </footer>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: darkMode ? '#374151' : '#ffffff',
            color: darkMode ? '#f3f4f6' : '#1f2937',
          },
        }} 
      />
    </div>
  );
}

export default App;