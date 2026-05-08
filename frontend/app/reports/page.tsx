"use client";

import { motion } from "framer-motion";

export default function Reports() {
  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2">
            Safety Reports
          </h1>
          <p className="text-gray-400">
            AI-generated safety insights and recommendations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-8 rounded-lg glow text-center"
        >
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            AI Report Generation
          </h2>
          <p className="text-gray-400 mb-6">
            Automated safety reports with natural language insights will be
            available in Week 3 with the AI agent system.
          </p>
          <div className="inline-block px-6 py-3 bg-cyan-500/20 rounded-lg text-cyan-400 font-medium">
            Coming Soon: Week 3
          </div>
        </motion.div>
      </div>
    </div>
  );
}
