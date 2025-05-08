import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { WeatherData } from '../types/weather';
import { formatDate } from '../utils/dateFormatter';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherGraphProps {
  weatherData: WeatherData;
}

type DatasetKey = 'temperature_2m_max' | 'temperature_2m_min' | 'temperature_2m_mean' | 
                 'apparent_temperature_max' | 'apparent_temperature_min' | 'apparent_temperature_mean';

const datasetConfig: Record<DatasetKey, {label: string, color: string}> = {
  temperature_2m_max: { label: 'Max Temperature', color: 'rgb(255, 99, 132)' },
  temperature_2m_min: { label: 'Min Temperature', color: 'rgb(54, 162, 235)' },
  temperature_2m_mean: { label: 'Mean Temperature', color: 'rgb(75, 192, 192)' },
  apparent_temperature_max: { label: 'Max Apparent Temperature', color: 'rgb(255, 159, 64)' },
  apparent_temperature_min: { label: 'Min Apparent Temperature', color: 'rgb(153, 102, 255)' },
  apparent_temperature_mean: { label: 'Mean Apparent Temperature', color: 'rgb(201, 203, 207)' }
};

const WeatherGraph: React.FC<WeatherGraphProps> = ({ weatherData }) => {
  const [selectedDatasets, setSelectedDatasets] = useState<DatasetKey[]>([
    'temperature_2m_max', 
    'temperature_2m_min', 
    'temperature_2m_mean'
  ]);

  const toggleDataset = (key: DatasetKey) => {
    setSelectedDatasets(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key) 
        : [...prev, key]
    );
  };

  const chartData = {
    labels: weatherData.daily.time.map(date => formatDate(date)),
    datasets: Object.entries(datasetConfig)
      .filter(([key]) => selectedDatasets.includes(key as DatasetKey))
      .map(([key, config]) => {
        const dataKey = key as DatasetKey;
        return {
          label: config.label,
          data: weatherData.daily[dataKey],
          borderColor: config.color,
          backgroundColor: `${config.color}33`,
          pointBackgroundColor: config.color,
          tension: 0.3,
          pointRadius: 3,
          pointHoverRadius: 5,
        };
      }),
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        padding: 10,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}°C`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)'
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      line: {
        borderWidth: 2
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Temperature Trends</h2>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(datasetConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => toggleDataset(key as DatasetKey)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 border 
              ${selectedDatasets.includes(key as DatasetKey) 
                ? `bg-${config.color} text-white` 
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'}`}
            style={{
              backgroundColor: selectedDatasets.includes(key as DatasetKey) ? config.color : '',
              borderColor: config.color,
              color: selectedDatasets.includes(key as DatasetKey) ? 'white' : config.color
            }}
          >
            {config.label}
          </button>
        ))}
      </div>
      
      <div className="flex-grow min-h-[300px]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default WeatherGraph;