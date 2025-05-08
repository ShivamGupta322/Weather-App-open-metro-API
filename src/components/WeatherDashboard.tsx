import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/api';
import InputForm from './InputForm';
import WeatherGraph from './WeatherGraph';
import WeatherTable from './WeatherTable';
import LoadingSpinner from './LoadingSpinner';
import RecentSearches from './RecentSearches';
import { WeatherData, SearchParams } from '../types/weather';
import toast from 'react-hot-toast';

const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<SearchParams[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(params);
      setWeatherData(data);
      
      // Add to recent searches
      const newSearch = {
        latitude: params.latitude,
        longitude: params.longitude,
        startDate: params.startDate,
        endDate: params.endDate
      };
      
      setRecentSearches(prev => {
        // Remove duplicates
        const filtered = prev.filter(item => 
          !(item.latitude === newSearch.latitude && 
            item.longitude === newSearch.longitude && 
            item.startDate === newSearch.startDate && 
            item.endDate === newSearch.endDate)
        );
        // Add new search to the beginning and limit to 5 items
        return [newSearch, ...filtered].slice(0, 5);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching weather data');
      toast.error(err instanceof Error ? err.message : 'An error occurred while fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full">
            <h2 className="text-xl font-semibold mb-4">Search Parameters</h2>
            <InputForm onSubmit={handleSearch} />
            
            {recentSearches.length > 0 && (
              <div className="mt-6">
                <RecentSearches searches={recentSearches} onSelect={handleSearch} />
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-h-[300px] flex items-center justify-center">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="text-center text-red-500">
                <p className="mb-2">Error:</p>
                <p>{error}</p>
              </div>
            ) : !weatherData ? (
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p>Enter location coordinates and date range to view weather data</p>
              </div>
            ) : (
              <WeatherGraph weatherData={weatherData} />
            )}
          </div>
        </div>
      </div>
      
      {weatherData && !loading && !error && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Weather Data Table</h2>
          <WeatherTable weatherData={weatherData} />
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;