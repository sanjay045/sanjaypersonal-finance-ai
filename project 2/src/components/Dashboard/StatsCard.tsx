import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  color: 'emerald' | 'blue' | 'amber' | 'red';
}

const colorClasses = {
  emerald: {
    bg: 'from-emerald-500 to-emerald-600',
    icon: 'bg-emerald-100 text-emerald-600',
    change: 'text-emerald-600',
  },
  blue: {
    bg: 'from-blue-500 to-blue-600',
    icon: 'bg-blue-100 text-blue-600',
    change: 'text-blue-600',
  },
  amber: {
    bg: 'from-amber-500 to-amber-600',
    icon: 'bg-amber-100 text-amber-600',
    change: 'text-amber-600',
  },
  red: {
    bg: 'from-red-500 to-red-600',
    icon: 'bg-red-100 text-red-600',
    change: 'text-red-600',
  },
};

export function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors.icon}`}>
          <Icon className="w-6 h-6" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${colors.change}`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}