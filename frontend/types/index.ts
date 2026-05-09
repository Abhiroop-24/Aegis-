// Core data types for Aegis Platform

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Incident {
  id: string;
  external_id?: string;
  incident_type: string;
  severity: 1 | 2 | 3 | 4 | 5;
  description?: string;
  latitude: number;
  longitude: number;
  occurred_at: string;
  reported_at?: string;
  source: string;
  metadata?: Record<string, any>;
}

export interface SafetyScore {
  score: number; // 0-100
  level: 'very_safe' | 'safe' | 'moderate' | 'risky' | 'dangerous';
  location: Location;
  radius: number;
  incident_count: number;
  factors: Record<string, any>;
  calculated_at: string;
}

export interface HeatmapCell {
  latitude: number;
  longitude: number;
  intensity: number;
  weight: number;
}

export interface RouteSegment {
  start: Location;
  end: Location;
  distance: number; // meters
  safety_score: number;
}

export interface Route {
  id: string;
  type: 'fastest' | 'safest';
  path: Location[];
  segments: RouteSegment[];
  total_distance: number; // meters
  estimated_duration: number; // seconds
  overall_safety_score: number;
  risk_areas: Array<{
    location: Location;
    severity: number;
    description: string;
  }>;
}

export interface Hotspot {
  id: string;
  centroid: Location;
  incident_count: number;
  severity_avg: number;
  detected_at: string;
  active: boolean;
}

export interface TimeRange {
  start_date: string;
  end_date: string;
}

export interface AnalyticsData {
  incidents_by_type: Record<string, number>;
  incidents_by_hour: number[];
  incidents_by_day: number[];
  hotspots: Hotspot[];
  trends: {
    current_period: number;
    previous_period: number;
    change_percent: number;
    direction: 'up' | 'down' | 'stable';
  };
}

export interface SafetyAlert {
  id: string;
  severity: 'low' | 'medium' | 'high';
  area: string;
  message: string;
  timestamp: string;
  recommendations: string[];
}

export interface APIResponse<T> {
  data: T;
  status: string;
  timestamp: string;
}

export interface APIError {
  error: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
  request_id?: string;
}

export interface MapBounds {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
}

export interface FilterState {
  timeRange: TimeRange;
  incidentTypes: string[];
  severityRange: [number, number];
  showHeatmap: boolean;
  showSafetyScores: boolean;
}
