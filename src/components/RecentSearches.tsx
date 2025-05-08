import React from 'react';
import { SearchParams } from '../types/weather';
import { Clock, Search } from 'lucide-react';
import { formatDate } from '../utils/dateFormatter';

interface RecentSearchesProps {
  searches: SearchParams[];
  onSelect: (params: SearchParams) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ searches, onSelect }) => {
  if (searches.length === 0) return null;

  return (
    <div>
      <div className="flex items-center mb-3">
        <Clock size={16} className="mr-2 text-gray-500" />
        <h3 className="text-sm font-medium">Recent Searches</h3>
      </div>
      <ul className="space-y-2">
        {searches.map((search, index) => {
          const label = `${search.latitude.toFixed(2)}, ${search.longitude.toFixed(2)}`;
          const dateRange = `${formatDate(search.startDate)} to ${formatDate(search.endDate)}`;
          
          return (
            <li key={index}>
              <button
                onClick={() => onSelect(search)}
                className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center"
              >
                <Search size={14} className="mr-2 text-gray-500" />
                <div>
                  <div className="font-medium">{label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{dateRange}</div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentSearches;