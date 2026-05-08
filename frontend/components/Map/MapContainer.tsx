"use client";

import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import IncidentMarkers from "./IncidentMarkers";
import HeatmapLayer from "./HeatmapLayer";
import SafetyScoreOverlay from "./SafetyScoreOverlay";
import SafetyGrid from "./SafetyGrid";
import useIncidents from "@/lib/hooks/useIncidents";

interface MapContainerProps {
  filters: any;
  heatmapEnabled: boolean;
  safetyGridEnabled: boolean;
}

function MapController() {
  const map = useMap();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setUserLocation(coords);
          map.setView(coords, 13);
        },
        () => {
          // Fallback to Chicago
          map.setView([41.8781, -87.6298], 12);
        }
      );
    }
  }, [map]);

  return null;
}

export default function MapContainer({
  filters,
  heatmapEnabled,
  safetyGridEnabled,
}: MapContainerProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    41.8781, -87.6298,
  ]);
  const [mapBounds, setMapBounds] = useState<any>(null);

  const { incidents, isLoading } = useIncidents(mapBounds, filters);

  return (
    <div className="relative w-full h-full">
      <LeafletMap
        center={mapCenter}
        zoom={12}
        className="w-full h-full z-0"
        zoomControl={true}
      >
        <MapController />
        
        {/* Dark theme tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Incident Markers */}
        <IncidentMarkers incidents={incidents} />

        {/* Heatmap Layer */}
        {heatmapEnabled && <HeatmapLayer incidents={incidents} />}

        {/* Safety Grid */}
        {safetyGridEnabled && <SafetyGrid bounds={mapBounds} />}
      </LeafletMap>

      {/* Safety Score Overlay */}
      <SafetyScoreOverlay center={mapCenter} />

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute top-4 right-4 glass px-4 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Loading incidents...</span>
          </div>
        </div>
      )}
    </div>
  );
}
