"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterSidebarProps {
  filters: {
    dateRange: { start: Date | null; end: Date | null };
    incidentTypes: string[];
    severityRange: [number, number];
  };
  onFiltersChange: (filters: FilterSidebarProps['filters']) => void;
  heatmapEnabled: boolean;
  onHeatmapToggle: (enabled: boolean) => void;
  safetyGridEnabled: boolean;
  onSafetyGridToggle: (enabled: boolean) => void;
}

const incidentTypes = [
  "Theft",
  "Assault",
  "Vandalism",
  "Burglary",
  "Robbery",
  "Vehicle Theft",
];

export default function FilterSidebar({
  filters,
  onFiltersChange,
  heatmapEnabled,
  onHeatmapToggle,
  safetyGridEnabled,
  onSafetyGridToggle,
}: FilterSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleIncidentType = (type: string) => {
    const newTypes = filters.incidentTypes.includes(type)
      ? filters.incidentTypes.filter((t) => t !== type)
      : [...filters.incidentTypes, type];
    onFiltersChange({ ...filters, incidentTypes: newTypes });
  };

  return (
    <>
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed left-4 top-20 z-40 md:hidden glass p-2 rounded-lg glow"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-80 glass border-r border-cyan-500/20 p-6 overflow-y-auto fixed md:relative h-full z-30"
          >
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-xl font-bold text-cyan-400 mb-2">
                  Filters
                </h2>
                <p className="text-sm text-gray-400">
                  Customize your safety view
                </p>
              </div>

              {/* Layer Controls */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-300">
                  Map Layers
                </h3>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-300">Heatmap</span>
                  <div
                    onClick={() => onHeatmapToggle(!heatmapEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      heatmapEnabled ? "bg-cyan-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        heatmapEnabled ? "translate-x-6" : ""
                      }`}
                    />
                  </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-300">Safety Grid</span>
                  <div
                    onClick={() => onSafetyGridToggle(!safetyGridEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      safetyGridEnabled ? "bg-cyan-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        safetyGridEnabled ? "translate-x-6" : ""
                      }`}
                    />
                  </div>
                </label>
              </div>

              {/* Quick Time Filters */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-300">
                  Time Range
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {["24h", "7d", "30d", "90d"].map((range) => (
                    <button
                      key={range}
                      className="px-3 py-2 text-sm rounded-lg glass hover:bg-cyan-500/20 transition-colors"
                    >
                      Last {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Incident Types */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-300">
                  Incident Types
                </h3>
                <div className="space-y-2">
                  {incidentTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.incidentTypes.includes(type)}
                        onChange={() => toggleIncidentType(type)}
                        className="w-4 h-4 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span className="text-sm text-gray-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Severity Range */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-300">
                  Severity Level
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">Low</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={filters.severityRange[1]}
                    onChange={(e) =>
                      onFiltersChange({
                        ...filters,
                        severityRange: [1, parseInt(e.target.value)],
                      })
                    }
                    className="flex-1"
                  />
                  <span className="text-xs text-gray-400">High</span>
                </div>
                <div className="text-center text-sm text-cyan-400">
                  Level: 1 - {filters.severityRange[1]}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
