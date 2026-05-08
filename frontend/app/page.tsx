"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import LoadingSpinner from "@/components/LoadingSpinner";

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(() => import("@/components/Map/MapContainer"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function Home() {
  const [filters, setFilters] = useState({
    dateRange: { start: null, end: null },
    incidentTypes: [] as string[],
    severityRange: [1, 5] as [number, number],
  });

  const [heatmapEnabled, setHeatmapEnabled] = useState(false);
  const [safetyGridEnabled, setSafetyGridEnabled] = useState(false);

  return (
    <div className="flex h-screen pt-16">
      {/* Filter Sidebar */}
      <FilterSidebar
        filters={filters}
        onFiltersChange={setFilters}
        heatmapEnabled={heatmapEnabled}
        onHeatmapToggle={setHeatmapEnabled}
        safetyGridEnabled={safetyGridEnabled}
        onSafetyGridToggle={setSafetyGridEnabled}
      />

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          filters={filters}
          heatmapEnabled={heatmapEnabled}
          safetyGridEnabled={safetyGridEnabled}
        />
      </div>
    </div>
  );
}
