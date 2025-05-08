export interface SearchParams {
  latitude: number;
  longitude: number;
  startDate: string;
  endDate: string;
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    temperature_2m_mean: string;
    apparent_temperature_max: string;
    apparent_temperature_min: string;
    apparent_temperature_mean: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    temperature_2m_mean: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    apparent_temperature_mean: number[];
  };
}