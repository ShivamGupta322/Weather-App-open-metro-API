import React, { useState } from 'react';
import { SearchParams } from '../types/weather';
import { Calendar, MapPin } from 'lucide-react';

interface InputFormProps {
  onSubmit: (params: SearchParams) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateLatitude = (value: string): boolean => {
    const lat = parseFloat(value);
    return !isNaN(lat) && lat >= -90 && lat <= 90;
  };

  const validateLongitude = (value: string): boolean => {
    const lon = parseFloat(value);
    return !isNaN(lon) && lon >= -180 && lon <= 180;
  };

  const validateDates = (start: string, end: string): boolean => {
    if (!start || !end) return false;
    
    const startDateTime = new Date(start).getTime();
    const endDateTime = new Date(end).getTime();
    const now = new Date().getTime();
    
    return startDateTime <= endDateTime && endDateTime <= now;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: {[key: string]: string} = {};
    
    if (!validateLatitude(latitude)) {
      newErrors.latitude = 'Please enter a valid latitude (-90 to 90)';
    }
    
    if (!validateLongitude(longitude)) {
      newErrors.longitude = 'Please enter a valid longitude (-180 to 180)';
    }
    
    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!endDate) {
      newErrors.endDate = 'End date is required';
    }
    
    if (startDate && endDate && !validateDates(startDate, endDate)) {
      newErrors.dateRange = 'End date must be after start date and not in the future';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        startDate,
        endDate
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Latitude
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <MapPin size={16} />
          </div>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter latitude (-90 to 90)"
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
        </div>
        {errors.latitude && <p className="mt-1 text-sm text-red-500">{errors.latitude}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          Longitude
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <MapPin size={16} />
          </div>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter longitude (-180 to 180)"
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
        </div>
        {errors.longitude && <p className="mt-1 text-sm text-red-500">{errors.longitude}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          Start Date
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <Calendar size={16} />
          </div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
        </div>
        {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          End Date
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <Calendar size={16} />
          </div>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            max={new Date().toISOString().split('T')[0]}
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
        </div>
        {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>}
      </div>
      
      {errors.dateRange && <p className="text-sm text-red-500">{errors.dateRange}</p>}
      
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Get Weather Data
      </button>
    </form>
  );
};

export default InputForm;