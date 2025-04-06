"use client";

import { ApiService } from './api';

// Types
export interface WeatherCondition {
  condition: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: WeatherCondition;
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    precip_mm: number;
    cloud: number;
    uv: number;
  };
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    totalrain_mm: number;
    condition: WeatherCondition;
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
  hour: {
    time: string;
    temp_c: number;
    condition: WeatherCondition;
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    precip_mm: number;
    will_it_rain: number;
    chance_of_rain: number;
  }[];
}

export interface ForecastData extends WeatherData {
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface WeatherAlerts {
  location: string;
  alerts: {
    title: string;
    severity: string;
    urgency: string;
    description: string;
    start: string;
    end: string;
  }[];
}

export interface WeatherAdvisory {
  crop: string;
  advisory: string;
}

/**
 * Weather Service for handling weather-related API calls
 */
export class WeatherService extends ApiService {
  /**
   * Get current weather for a location
   * @param params Location parameters (provide either location or lat/lon)
   */
  async getCurrentWeather(
    params: { location?: string; lat?: number; lon?: number }
  ): Promise<WeatherData> {
    const queryParams = new URLSearchParams();

    if (params.location) {
      queryParams.append('location', params.location);
    }

    if (params.lat !== undefined && params.lon !== undefined) {
      queryParams.append('lat', params.lat.toString());
      queryParams.append('lon', params.lon.toString());
    }

    const query = queryParams.toString();
    const endpoint = `/weather/current${query ? `?${query}` : ''}`;

    return this.get<WeatherData>(endpoint);
  }

  /**
   * Get weather forecast for a location
   * @param params Forecast parameters
   */
  async getForecast(
    params: { location?: string; lat?: number; lon?: number; days?: number }
  ): Promise<ForecastData> {
    const queryParams = new URLSearchParams();

    if (params.location) {
      queryParams.append('location', params.location);
    }

    if (params.lat !== undefined && params.lon !== undefined) {
      queryParams.append('lat', params.lat.toString());
      queryParams.append('lon', params.lon.toString());
    }

    if (params.days) {
      queryParams.append('days', params.days.toString());
    }

    const query = queryParams.toString();
    const endpoint = `/weather/forecast${query ? `?${query}` : ''}`;

    return this.get<ForecastData>(endpoint);
  }

  /**
   * Get weather alerts for a location
   * @param location Location to get alerts for
   */
  async getAlerts(location: string): Promise<WeatherAlerts> {
    return this.get<WeatherAlerts>(`/weather/alerts?location=${encodeURIComponent(location)}`);
  }

  /**
   * Get crop-specific weather advisories
   * @param params Weather advisory parameters
   */
  async getAdvisories(
    params: { crop: string; location?: string; lat?: number; lon?: number }
  ): Promise<WeatherAdvisory[]> {
    const queryParams = new URLSearchParams();

    queryParams.append('crop', params.crop);

    if (params.location) {
      queryParams.append('location', params.location);
    }

    if (params.lat !== undefined && params.lon !== undefined) {
      queryParams.append('lat', params.lat.toString());
      queryParams.append('lon', params.lon.toString());
    }

    const query = queryParams.toString();
    const endpoint = `/weather/advisories${query ? `?${query}` : ''}`;

    return this.get<WeatherAdvisory[]>(endpoint);
  }
}

// Create and export a singleton instance
const weatherService = new WeatherService();
export default weatherService; 