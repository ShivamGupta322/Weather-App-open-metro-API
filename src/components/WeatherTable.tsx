import React, { useState } from 'react';
import { WeatherData } from '../types/weather';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { formatDate } from '../utils/dateFormatter';

interface WeatherTableProps {
  weatherData: WeatherData;
}

const WeatherTable: React.FC<WeatherTableProps> = ({ weatherData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const totalDays = weatherData.daily.time.length;
  const totalPages = Math.ceil(totalDays / rowsPerPage);
  
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalDays);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const formatTemperature = (value: number | null): string => {
    return value !== null ? value.toFixed(1) : 'N/A';
  };

  const getTemperatureClass = (value: number | null): string => {
    if (value === null) return 'text-gray-400 dark:text-gray-500';
    if (value > 30) return 'text-red-600 dark:text-red-400';
    if (value < 0) return 'text-blue-600 dark:text-blue-400';
    return '';
  };

  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm">
          Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{endIndex}</span> of <span className="font-medium">{totalDays}</span> days
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="rowsPerPage" className="text-sm">
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-700"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Max Temp (°C)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Min Temp (°C)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Mean Temp (°C)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Max Apparent (°C)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Min Apparent (°C)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Mean Apparent (°C)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {weatherData.daily.time.slice(startIndex, endIndex).map((date, index) => {
              const actualIndex = startIndex + index;
              return (
                <tr key={date} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {formatDate(date)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${getTemperatureClass(weatherData.daily.temperature_2m_max[actualIndex])}`}>
                    {formatTemperature(weatherData.daily.temperature_2m_max[actualIndex])}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${getTemperatureClass(weatherData.daily.temperature_2m_min[actualIndex])}`}>
                    {formatTemperature(weatherData.daily.temperature_2m_min[actualIndex])}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${getTemperatureClass(weatherData.daily.temperature_2m_mean[actualIndex])}`}>
                    {formatTemperature(weatherData.daily.temperature_2m_mean[actualIndex])}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${getTemperatureClass(weatherData.daily.apparent_temperature_max[actualIndex])}`}>
                    {formatTemperature(weatherData.daily.apparent_temperature_max[actualIndex])}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${getTemperatureClass(weatherData.daily.apparent_temperature_min[actualIndex])}`}>
                    {formatTemperature(weatherData.daily.apparent_temperature_min[actualIndex])}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${getTemperatureClass(weatherData.daily.apparent_temperature_mean[actualIndex])}`}>
                    {formatTemperature(weatherData.daily.apparent_temperature_mean[actualIndex])}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6 mt-4">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="inline-flex rounded-md shadow-sm isolate" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium
                    ${currentPage === 1 
                      ? 'text-gray-300 dark:text-gray-500 cursor-not-allowed' 
                      : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                >
                  <span className="sr-only">First</span>
                  <ChevronsLeft size={18} />
                </button>
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 border border-r-0 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium
                    ${currentPage === 1 
                      ? 'text-gray-300 dark:text-gray-500 cursor-not-allowed' 
                      : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft size={18} />
                </button>
                
                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border border-r-0 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium
                        ${currentPage === pageNum
                          ? 'z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-blue-300'
                          : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 border border-r-0 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium
                    ${currentPage === totalPages 
                      ? 'text-gray-300 dark:text-gray-500 cursor-not-allowed' 
                      : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight size={18} />
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium
                    ${currentPage === totalPages 
                      ? 'text-gray-300 dark:text-gray-500 cursor-not-allowed' 
                      : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                >
                  <span className="sr-only">Last</span>
                  <ChevronsRight size={18} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherTable;