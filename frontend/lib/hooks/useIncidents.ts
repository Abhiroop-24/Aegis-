import { useState, useEffect } from "react";
import { Incident } from "@/types";

const INCIDENT_TYPES = ["Theft", "Assault", "Vandalism", "Burglary", "Robbery", "Vehicle Theft"];

// Chicago bounding box
const CHICAGO_BOUNDS = {
  minLat: 41.6,
  maxLat: 42.0,
  minLng: -87.9,
  maxLng: -87.5,
};

const generateMockIncidents = (count: number = 100): Incident[] => {
  const incidents: Incident[] = [];
  const { minLat, maxLat, minLng, maxLng } = CHICAGO_BOUNDS;

  for (let i = 0; i < count; i++) {
    const lat = minLat + Math.random() * (maxLat - minLat);
    const lng = minLng + Math.random() * (maxLng - minLng);
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    incidents.push({
      id: `incident-${i}`,
      incident_type: INCIDENT_TYPES[Math.floor(Math.random() * INCIDENT_TYPES.length)],
      severity: (Math.floor(Math.random() * 5) + 1) as 1 | 2 | 3 | 4 | 5,
      latitude: lat,
      longitude: lng,
      occurred_at: date.toISOString(),
      description: `Incident reported in the area`,
      source: "mock",
    });
  }

  return incidents;
};

export default function useIncidents(bounds: any, filters: any) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const mockData = generateMockIncidents(500);
      
      // Apply filters
      let filtered = mockData;
      
      if (filters.incidentTypes.length > 0) {
        filtered = filtered.filter((inc) =>
          filters.incidentTypes.includes(inc.incident_type)
        );
      }
      
      if (filters.severityRange) {
        filtered = filtered.filter(
          (inc) =>
            inc.severity >= filters.severityRange[0] &&
            inc.severity <= filters.severityRange[1]
        );
      }
      
      setIncidents(filtered);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [bounds, filters]);

  return { incidents, isLoading };
}
