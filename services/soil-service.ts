"use client";

import { ApiService } from './api';

// Types
export interface SoilData {
  id?: number;
  user_id?: number;
  location: {
    latitude?: number;
    longitude?: number;
    state: string;
    district: string;
    village?: string;
  };
  sample_date: string;
  soil_type: string;
  texture: string;
  color: string;
  ph_level: number;
  organic_matter: number;
  nutrients: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    calcium?: number;
    magnesium?: number;
    sulfur?: number;
    zinc?: number;
    iron?: number;
    manganese?: number;
    copper?: number;
    boron?: number;
  };
  salinity?: number;
  moisture_content?: number;
  water_holding_capacity?: number;
  cation_exchange_capacity?: number;
  created_at?: string;
  updated_at?: string;
}

export interface SoilHealthReport {
  soil_data: SoilData;
  health_score: number;
  fertility_status: 'poor' | 'moderate' | 'good' | 'excellent';
  deficient_nutrients: {
    nutrient: string;
    level: number;
    ideal_range: {
      min: number;
      max: number;
    };
    severity: 'mild' | 'moderate' | 'severe';
  }[];
  excess_nutrients: {
    nutrient: string;
    level: number;
    ideal_range: {
      min: number;
      max: number;
    };
    severity: 'mild' | 'moderate' | 'severe';
  }[];
  recommendations: {
    issue?: string;
    recommendation: string;
    priority: 'low' | 'medium' | 'high';
  }[];
}

export interface FertilizerRecommendation {
  crop: string;
  soil_data: SoilData;
  fertilizers: {
    name: string;
    type: string;
    application_rate: {
      value: number;
      unit: string;
    };
    application_method: string;
    timing: string;
    cost_estimate?: {
      value: number;
      currency: string;
    };
    alternatives?: {
      name: string;
      application_rate: {
        value: number;
        unit: string;
      };
    }[];
  }[];
  additional_amendments?: {
    name: string;
    purpose: string;
    application_rate: {
      value: number;
      unit: string;
    };
    notes?: string;
  }[];
  notes?: string;
}

export interface SoilConservationPractice {
  id: number;
  name: string;
  description: string;
  benefits: string[];
  suitable_for: {
    soil_types: string[];
    topography: string[];
    farm_types: string[];
  };
  implementation_steps: string[];
  cost_level: 'low' | 'medium' | 'high';
  time_to_benefit: 'immediate' | 'short-term' | 'long-term';
  resources_needed: string[];
  success_indicators: string[];
  images?: string[];
}

/**
 * Soil Service for handling soil-related API calls
 */
export class SoilService extends ApiService {
  /**
   * Submit soil data for analysis
   * @param soilData Soil sample data
   */
  async submitSoilData(soilData: Omit<SoilData, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<SoilData> {
    return this.post<SoilData>('/soil/data', soilData);
  }

  /**
   * Get soil data by ID
   * @param soilDataId Soil data ID
   */
  async getSoilData(soilDataId: number): Promise<SoilData> {
    return this.get<SoilData>(`/soil/data/${soilDataId}`);
  }

  /**
   * Get all soil data for the current user
   */
  async getUserSoilData(): Promise<SoilData[]> {
    return this.get<SoilData[]>('/soil/data/user');
  }

  /**
   * Get a health report for a soil sample
   * @param soilDataId Soil data ID
   */
  async getSoilHealthReport(soilDataId: number): Promise<SoilHealthReport> {
    return this.get<SoilHealthReport>(`/soil/health-report/${soilDataId}`);
  }

  /**
   * Get fertilizer recommendations for a specific crop based on soil data
   * @param params Parameters for fertilizer recommendation
   */
  async getFertilizerRecommendation(
    params: {
      soil_data_id: number;
      crop: string;
    }
  ): Promise<FertilizerRecommendation> {
    const queryParams = new URLSearchParams();

    queryParams.append('soil_data_id', params.soil_data_id.toString());
    queryParams.append('crop', params.crop);

    const endpoint = `/soil/fertilizer-recommendation?${queryParams.toString()}`;

    return this.get<FertilizerRecommendation>(endpoint);
  }

  /**
   * Get soil conservation practices suitable for the specified soil data
   * @param soilDataId Soil data ID
   * @param topography Optional topography information
   */
  async getSoilConservationPractices(
    soilDataId: number,
    topography?: 'flat' | 'gentle_slope' | 'moderate_slope' | 'steep'
  ): Promise<SoilConservationPractice[]> {
    const queryParams = new URLSearchParams();

    queryParams.append('soil_data_id', soilDataId.toString());

    if (topography) {
      queryParams.append('topography', topography);
    }

    const endpoint = `/soil/conservation-practices?${queryParams.toString()}`;

    return this.get<SoilConservationPractice[]>(endpoint);
  }

  /**
   * Get common soil types and their characteristics for a specific region
   * @param state State name
   * @param district Optional district name for more specific results
   */
  async getRegionalSoilTypes(
    state: string,
    district?: string
  ): Promise<{
    region: {
      state: string;
      district?: string;
    };
    soil_types: {
      name: string;
      description: string;
      characteristics: {
        texture: string;
        color: string;
        typical_ph_range: {
          min: number;
          max: number;
        };
        fertility: string;
        suitable_crops: string[];
        challenges: string[];
        management_tips: string[];
      };
      percentage_of_region?: number;
    }[];
  }> {
    const queryParams = new URLSearchParams();

    queryParams.append('state', state);

    if (district) {
      queryParams.append('district', district);
    }

    const endpoint = `/soil/regional-types?${queryParams.toString()}`;

    return this.get<{
      region: {
        state: string;
        district?: string;
      };
      soil_types: {
        name: string;
        description: string;
        characteristics: {
          texture: string;
          color: string;
          typical_ph_range: {
            min: number;
            max: number;
          };
          fertility: string;
          suitable_crops: string[];
          challenges: string[];
          management_tips: string[];
        };
        percentage_of_region?: number;
      }[];
    }>(endpoint);
  }
}

// Create and export a singleton instance
const soilService = new SoilService();
export default soilService; 