"use client";

import { useEffect, useState } from "react";
import { Rectangle, useMap } from "react-leaflet";

interface SafetyGridProps {
  bounds: any;
}

export default function SafetyGrid({ bounds }: SafetyGridProps) {
  const map = useMap();
  const [gridCells, setGridCells] = useState<any[]>([]);

  useEffect(() => {
    if (!bounds) return;

    const mapBounds = map.getBounds();
    const north = mapBounds.getNorth();
    const south = mapBounds.getSouth();
    const east = mapBounds.getEast();
    const west = mapBounds.getWest();

    // Create 5x5 grid
    const rows = 5;
    const cols = 5;
    const latStep = (north - south) / rows;
    const lngStep = (east - west) / cols;

    const cells = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cellBounds: [[number, number], [number, number]] = [
          [south + i * latStep, west + j * lngStep],
          [south + (i + 1) * latStep, west + (j + 1) * lngStep],
        ];

        // Mock safety score for each cell
        const score = Math.floor(Math.random() * 100);
        const color =
          score >= 80
            ? "#10b98140"
            : score >= 60
            ? "#84cc1640"
            : score >= 40
            ? "#eab30840"
            : score >= 20
            ? "#f9731640"
            : "#ef444440";

        cells.push({
          bounds: cellBounds,
          color,
          score,
        });
      }
    }

    setGridCells(cells);
  }, [map, bounds]);

  return (
    <>
      {gridCells.map((cell, index) => (
        <Rectangle
          key={index}
          bounds={cell.bounds}
          pathOptions={{
            fillColor: cell.color,
            fillOpacity: 0.4,
            color: cell.color,
            weight: 1,
          }}
        />
      ))}
    </>
  );
}
