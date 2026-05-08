"use client";

import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { Incident } from "@/types";

interface IncidentMarkersProps {
  incidents: Incident[];
}

// Create custom icons based on severity
const createIcon = (severity: number) => {
  const colors = {
    1: "#10b981", // green
    2: "#84cc16", // lime
    3: "#eab308", // yellow
    4: "#f97316", // orange
    5: "#ef4444", // red
  };

  const color = colors[severity as keyof typeof colors] || colors[3];

  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 10px ${color}80;
      "></div>
    `,
    className: "",
    iconSize: [12, 12],
  });
};

export default function IncidentMarkers({ incidents }: IncidentMarkersProps) {
  if (!incidents || incidents.length === 0) return null;

  return (
    <MarkerClusterGroup
      chunkedLoading
      maxClusterRadius={50}
      spiderfyOnMaxZoom={true}
      showCoverageOnHover={false}
    >
      {incidents.map((incident) => (
        <Marker
          key={incident.id}
          position={[incident.latitude, incident.longitude]}
          icon={createIcon(incident.severity)}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-cyan-400">
                  {incident.incident_type}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    incident.severity >= 4
                      ? "bg-red-500/20 text-red-400"
                      : incident.severity >= 3
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  Level {incident.severity}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-300">
                <p>
                  <span className="text-gray-400">Date:</span>{" "}
                  {new Date(incident.occurred_at).toLocaleDateString()}
                </p>
                <p>
                  <span className="text-gray-400">Time:</span>{" "}
                  {new Date(incident.occurred_at).toLocaleTimeString()}
                </p>
                {incident.description && (
                  <p className="mt-2 text-gray-300">{incident.description}</p>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
}
