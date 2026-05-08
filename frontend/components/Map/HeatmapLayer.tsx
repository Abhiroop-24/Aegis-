"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { Incident } from "@/types";

interface HeatmapLayerProps {
  incidents: Incident[];
}

export default function HeatmapLayer({ incidents }: HeatmapLayerProps) {
  const map = useMap();

  useEffect(() => {
    if (!incidents || incidents.length === 0) return;

    // Convert incidents to heatmap points [lat, lng, intensity]
    const points = incidents.map((incident) => [
      incident.latitude,
      incident.longitude,
      incident.severity / 5, // Normalize severity to 0-1
    ]);

    // Create heatmap layer
    const heatLayer = (L as any).heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      max: 1.0,
      gradient: {
        0.0: "#10b981",
        0.3: "#84cc16",
        0.5: "#eab308",
        0.7: "#f97316",
        1.0: "#ef4444",
      },
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, incidents]);

  return null;
}
