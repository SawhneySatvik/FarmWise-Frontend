"use client";

import { ApiService } from './api';

// Types
export interface MarketLocation {
  id: number;
  name: string;
  district: string;
  state: string;
  location_type: string;
}

export interface CropPrice {
  id: number;
  crop: string;
  variety?: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  price_unit: string;
  market: MarketLocation;
  date: string;
}

export interface CropPriceTrend {
  crop: string;
  trend: 'up' | 'down' | 'stable';
  percent_change: number;
  current_price: number;
  price_unit: string;
  prediction_window: string;
}

export interface MarketForecast {
  crop: string;
  forecasted_price: number;
  price_unit: string;
  confidence: number;
  forecast_date: string;
  notes?: string;
}

export interface CropRecommendation {
  crop: string;
  suitability_score: number;
  expected_yield: number;
  yield_unit: string;
  expected_price: number;
  price_unit: string;
  estimated_roi: number;
  planting_season: string;
  harvest_window: string;
}

/**
 * Market Service for handling market-related API calls
 */
export class MarketService extends ApiService {
  /**
   * Get list of markets by location
   * @param params Location parameters (state and/or district)
   */
  async getMarketsByLocation(
    params: { state?: string; district?: string }
  ): Promise<MarketLocation[]> {
    const queryParams = new URLSearchParams();

    if (params.state) {
      queryParams.append('state', params.state);
    }

    if (params.district) {
      queryParams.append('district', params.district);
    }

    const query = queryParams.toString();
    const endpoint = `/market/locations${query ? `?${query}` : ''}`;

    return this.get<MarketLocation[]>(endpoint);
  }

  /**
   * Get prices for a specific crop
   * @param crop Crop name
   * @param state Optional state filter
   * @param market_id Optional market ID filter
   */
  async getCropPrices(
    crop: string,
    state?: string,
    market_id?: number
  ): Promise<CropPrice[]> {
    const queryParams = new URLSearchParams();

    queryParams.append('crop', crop);

    if (state) {
      queryParams.append('state', state);
    }

    if (market_id) {
      queryParams.append('market_id', market_id.toString());
    }

    const query = queryParams.toString();
    const endpoint = `/market/prices${query ? `?${query}` : ''}`;

    return this.get<CropPrice[]>(endpoint);
  }

  /**
   * Get price trends for crops
   * @param crops Array of crop names to get trends for
   * @param period Period to analyze ('week', 'month', '3month', 'year')
   */
  async getPriceTrends(
    crops: string[],
    period: 'week' | 'month' | '3month' | 'year' = 'month'
  ): Promise<CropPriceTrend[]> {
    const queryParams = new URLSearchParams();

    queryParams.append('crops', crops.join(','));
    queryParams.append('period', period);

    const endpoint = `/market/trends?${queryParams.toString()}`;

    return this.get<CropPriceTrend[]>(endpoint);
  }

  /**
   * Get price forecasts for crops
   * @param crops Array of crop names to get forecasts for
   * @param window Forecast window ('week', 'month', '3month')
   */
  async getPriceForecasts(
    crops: string[],
    window: 'week' | 'month' | '3month' = 'month'
  ): Promise<MarketForecast[]> {
    const queryParams = new URLSearchParams();

    queryParams.append('crops', crops.join(','));
    queryParams.append('window', window);

    const endpoint = `/market/forecasts?${queryParams.toString()}`;

    return this.get<MarketForecast[]>(endpoint);
  }

  /**
   * Get crop recommendations based on market data and user's location
   * @param params Recommendation parameters
   */
  async getCropRecommendations(
    params: {
      state: string;
      district?: string;
      soil_type?: string;
      farm_size?: number;
      limit?: number;
    }
  ): Promise<CropRecommendation[]> {
    const queryParams = new URLSearchParams();

    queryParams.append('state', params.state);

    if (params.district) {
      queryParams.append('district', params.district);
    }

    if (params.soil_type) {
      queryParams.append('soil_type', params.soil_type);
    }

    if (params.farm_size) {
      queryParams.append('farm_size', params.farm_size.toString());
    }

    if (params.limit) {
      queryParams.append('limit', params.limit.toString());
    }

    const endpoint = `/market/recommendations?${queryParams.toString()}`;

    return this.get<CropRecommendation[]>(endpoint);
  }
}

// Create and export a singleton instance
const marketService = new MarketService();
export default marketService; 