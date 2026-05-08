"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SafetyScoreOverlayProps {
  center: [number, number];
}

export default function SafetyScoreOverlay({
  center,
}: SafetyScoreOverlayProps) {
  const [score, setScore] = useState<number | null>(null);
  const [level, setLevel] = useState<string>("");

  useEffect(() => {
    // Simulate safety score calculation
    // In production, this would fetch from API
    const mockScore = Math.floor(Math.random() * 100);
    setScore(mockScore);

    if (mockScore >= 80) setLevel("Very Safe");
    else if (mockScore >= 60) setLevel("Safe");
    else if (mockScore >= 40) setLevel("Moderate");
    else if (mockScore >= 20) setLevel("Risky");
    else setLevel("Dangerous");
  }, [center]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-lime-400";
    if (score >= 40) return "text-yellow-400";
    if (score >= 20) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <AnimatePresence>
      {score !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-6 left-6 glass p-4 rounded-lg glow z-10"
        >
          <div className="flex items-center space-x-4">
            {/* Circular Progress */}
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${(score / 100) * 176} 176`}
                  className={getScoreColor(score)}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-lg font-bold ${getScoreColor(score)}`}>
                  {score}
                </span>
              </div>
            </div>

            {/* Score Info */}
            <div>
              <div className="text-sm text-gray-400">Safety Score</div>
              <div className={`text-lg font-bold ${getScoreColor(score)}`}>
                {level}
              </div>
              <div className="text-xs text-gray-500">Area Center</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
