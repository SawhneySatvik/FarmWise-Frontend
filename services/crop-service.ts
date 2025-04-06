"use client";

import { ApiService } from './api';

// Types
export interface Crop {
  id: number;
  name: string;
  scientific_name: string;
  category: string;
  description?: string;
  growing_season: string[];
  water_requirement: 'low' | 'medium' | 'high';
  temperature_range: {
    min: number;
    max: number;
    unit: 'celsius' | 'fahrenheit';
  };
  growth_duration: {
    min: number;
    max: number;
    unit: 'days' | 'months';
  };
  preferred_soil_types: string[];
  nutrients: {
    name: string;
    amount: number;
    unit: string;
  }[];
}

export interface CropPest {
  id: number;
  name: string;
  scientific_name: string;
  description: string;
  affected_crops: string[];
  symptoms: string[];
  control_measures: string[];
  prevention_measures: string[];
  images?: string[];
}

export interface CropDisease {
  id: number;
  name: string;
  scientific_name: string;
  causal_agent: string;
  description: string;
  affected_crops: string[];
  symptoms: string[];
  treatment: string[];
  prevention: string[];
  images?: string[];
}

export interface CropStage {
  id: number;
  crop: string;
  stage_name: string;
  description: string;
  duration: {
    min: number;
    max: number;
    unit: 'days' | 'weeks' | 'months';
  };
  water_requirement: string;
  nutrient_requirement: string;
  common_issues: string[];
  care_tips: string[];
  images?: string[];
}

export interface CropSchedule {
  crop: string;
  variety?: string;
  region: string;
  planting_window: {
    start_date: string;
    end_date: string;
  };
  harvest_window: {
    start_date: string;
    end_date: string;
  };
  key_stages: {
    name: string;
    start_days: number;
    end_days: number;
    activities: string[];
  }[];
}

/**
 * Crop Service for handling crop-related API calls
 */
export class CropService extends ApiService {
  /**
   * Get a list of all crops or filtered by category
   * @param category Optional crop category filter
   */
  async getCrops(category?: string): Promise<Crop[]> {
    const params = category ? `?category=${category}` : '';
    return this.get<Crop[]>(`/crops${params}`);
  }

  /**
   * Get detailed information about a specific crop
   * @param cropId Crop ID
   */
  async getCropDetails(cropId: number): Promise<Crop> {
    return this.get<Crop>(`/crops/${cropId}`);
  }

  /**
   * Get pests that affect a specific crop
   * @param cropName Name of the crop
   */
  async getCropPests(cropName: string): Promise<CropPest[]> {
    return this.get<CropPest[]>(`/crops/pests?crop=${encodeURIComponent(cropName)}`);
  }

  /**
   * Get diseases that affect a specific crop
   * @param cropName Name of the crop
   */
  async getCropDiseases(cropName: string): Promise<CropDisease[]> {
    return this.get<CropDisease[]>(`/crops/diseases?crop=${encodeURIComponent(cropName)}`);
  }

  /**
   * Get growth stages for a specific crop
   * @param cropName Name of the crop
   */
  async getCropStages(cropName: string): Promise<CropStage[]> {
    return this.get<CropStage[]>(`/crops/stages?crop=${encodeURIComponent(cropName)}`);
  }

  /**
   * Get planting and harvesting schedule for a crop in a specific region
   * @param params Schedule parameters
   */
  async getCropSchedule(
    params: {
      crop: string;
      region: string;
      variety?: string;
    }
  ): Promise<CropSchedule> {
    const queryParams = new URLSearchParams();
    
    queryParams.append('crop', params.crop);
    queryParams.append('region', params.region);
    
    if (params.variety) {
      queryParams.append('variety', params.variety);
    }
    
    const endpoint = `/crops/schedule?${queryParams.toString()}`;
    
    return this.get<CropSchedule>(endpoint);
  }

  /**
   * Get recommendation for crop varieties based on location and soil conditions
   * @param params Recommendation parameters
   */
  async getVarietyRecommendations(
    params: {
      crop: string;
      state: string;
      district?: string;
      soil_type?: string;
      purpose?: 'commercial' | 'subsistence';
    }
  ): Promise<{
    crop: string;
    varieties: {
      name: string;
      suitability: number;
      yield_potential: string;
      disease_resistance: string;
      maturity_days: number;
      special_features: string[];
    }[];
  }> {
    const queryParams = new URLSearchParams();
    
    queryParams.append('crop', params.crop);
    queryParams.append('state', params.state);
    
    if (params.district) {
      queryParams.append('district', params.district);
    }
    
    if (params.soil_type) {
      queryParams.append('soil_type', params.soil_type);
    }
    
    if (params.purpose) {
      queryParams.append('purpose', params.purpose);
    }
    
    const endpoint = `/crops/varieties?${queryParams.toString()}`;
    
    return this.get<{
      crop: string;
      varieties: {
        name: string;
        suitability: number;
        yield_potential: string;
        disease_resistance: string;
        maturity_days: number;
        special_features: string[];
      }[];
    }>(endpoint);
  }
}

// Create and export a singleton instance
const cropService = new CropService();
export default cropService; 