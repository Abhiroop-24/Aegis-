import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
}

export default function StatCard({
  title,
  value,
  change,
  trend,
  icon,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass p-6 rounded-lg glow"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span
          className={`text-sm font-semibold ${
            trend === "up" ? "text-green-400" : "text-red-400"
          }`}
        >
          {change}
        </span>
      </div>
      <div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-gray-400">{title}</div>
      </div>
    </motion.div>
  );
}
