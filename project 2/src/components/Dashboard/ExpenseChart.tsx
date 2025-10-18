import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Expense, ExpenseCategory } from '../../types';

interface ExpenseChartProps {
  expenses: Expense[];
}

const COLORS = {
  Food: '#10B981',
  Travel: '#3B82F6',
  Bills: '#F59E0B',
  Shopping: '#EF4444',
  Entertainment: '#8B5CF6',
  Healthcare: '#06B6D4',
  Others: '#6B7280',
};

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<ExpenseCategory, number>);

  const data = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-emerald-200">
          <p className="font-medium text-gray-800">{payload[0].name}</p>
          <p className="text-emerald-600">₹{payload[0].value.toLocaleString('en-IN')}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Expense Breakdown</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name as ExpenseCategory]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}