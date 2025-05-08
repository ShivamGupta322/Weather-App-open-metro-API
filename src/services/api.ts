import { WeatherData, SearchParams } from '../types/weather';

export const fetchWeatherData = async (params: SearchParams): Promise<WeatherData> => {
  const { latitude, longitude, startDate, endDate } = params;
  
  // Build API URL with required parameters
  const apiUrl = new URL("https://archive-api.open-meteo.com/v1/archive");
  
  // Add parameters
  apiUrl.searchParams.append("latitude", latitude.toString());
  apiUrl.searchParams.append("longitude", longitude.toString());
  apiUrl.searchParams.append("start_date", startDate);
  apiUrl.searchParams.append("end_date", endDate);
  apiUrl.searchParams.append("daily", [
    "temperature_2m_max",
    "temperature_2m_min",
    "temperature_2m_mean",
    "apparent_temperature_max",
    "apparent_temperature_min",
    "apparent_temperature_mean"
  ].join(","));
  apiUrl.searchParams.append("timezone", "auto");
  
  try {
    // Add delay to avoid rate limiting for demonstration purposes
    const cacheKey = `weather-${latitude}-${longitude}-${startDate}-${endDate}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    
    const response = await fetch(apiUrl.toString());
    
    if (!response.ok) {
      let errorMessage = `Failed to fetch weather data: ${response.status}`;
      
      try {
        const errorData = await response.json();
        if (errorData && errorData.reason) {
          errorMessage = errorData.reason;
        }
      } catch (e) {
        // Ignore JSON parsing error, use default error message
      }
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    
    // Cache the result in session storage
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};