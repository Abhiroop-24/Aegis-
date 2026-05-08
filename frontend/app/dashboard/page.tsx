"use client";

import { motion } from "framer-motion";
import StatCard from "@/components/StatCard";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Incidents",
      value: "1,247",
      change: "-12%",
      trend: "down",
      icon: "📊",
    },
    {
      title: "High Risk Areas",
      value: "8",
      change: "+2",
      trend: "up",
      icon: "⚠️",
    },
    {
      title: "Avg Safety Score",
      value: "72",
      change: "+5%",
      trend: "up",
      icon: "🛡️",
    },
    {
      title: "Active Alerts",
      value: "3",
      change: "-1",
      trend: "down",
      icon: "🔔",
    },
  ];

  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2">
            Safety Dashboard
          </h1>
          <p className="text-gray-400">
            Real-time urban safety intelligence and analytics
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Incident Trends */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-6 rounded-lg glow"
          >
            <h2 className="text-xl font-bold text-cyan-400 mb-4">
              Incident Trends
            </h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <p>Chart visualization coming in Week 2</p>
            </div>
          </motion.div>

          {/* Hotspot Rankings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-6 rounded-lg glow"
          >
            <h2 className="text-xl font-bold text-cyan-400 mb-4">
              Top Hotspots
            </h2>
            <div className="space-y-3">
              {[
                { area: "Downtown Loop", incidents: 156, score: 42 },
                { area: "West Side", incidents: 134, score: 38 },
                { area: "South Shore", incidents: 98, score: 51 },
                { area: "Austin", incidents: 87, score: 45 },
                { area: "Englewood", incidents: 76, score: 35 },
              ].map((hotspot, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div>
                    <div className="font-medium">{hotspot.area}</div>
                    <div className="text-sm text-gray-400">
                      {hotspot.incidents} incidents
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      hotspot.score >= 60
                        ? "bg-green-500/20 text-green-400"
                        : hotspot.score >= 40
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {hotspot.score}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
