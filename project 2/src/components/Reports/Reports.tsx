import React from 'react';
import { Download, BarChart3, PieChart, TrendingUp, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

export function Reports() {
  const { state } = useApp();
  const { expenses, user } = state;

  // Monthly expense data
  const monthlyData = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleDateString('en-US', { month: 'short' });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  }));

  // Category breakdown
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categoryData).map(([category, amount]) => ({
    category,
    amount,
  }));

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  const savingsRate = user ? ((user.income - totalExpenses) / user.income) * 100 : 0;

  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF export functionality would be implemented here using libraries like jsPDF');
  };

  const handleExportExcel = () => {
    // In a real app, this would generate and download an Excel file
    alert('Excel export functionality would be implemented here using libraries like xlsx');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Financial Reports</h1>
          <p className="text-gray-600">Analyze your financial trends and insights</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={handleExportPDF}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>PDF</span>
          </button>
          <button
            onClick={handleExportExcel}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Excel</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Expenses</h3>
          <p className="text-2xl font-bold text-gray-800">₹{totalExpenses.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Average Expense</h3>
          <p className="text-2xl font-bold text-gray-800">₹{averageExpense.toFixed(0)}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <PieChart className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Savings Rate</h3>
          <p className="text-2xl font-bold text-gray-800">{savingsRate.toFixed(1)}%</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Transactions</h3>
          <p className="text-2xl font-bold text-gray-800">{expenses.length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending Trend */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Monthly Spending Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₹${value}`, 'Amount']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #10B981',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Spending by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₹${value}`, 'Amount']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #10B981',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Financial Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Expense Insights</h4>
            <div className="space-y-3">
              {Object.entries(categoryData)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([category, amount], index) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span className="text-gray-700">#{index + 1} {category}</span>
                    </div>
                    <span className="font-medium">₹{amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Recommendations</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• {savingsRate >= 20 ? 'Excellent' : 'Consider increasing'} your savings rate</p>
              <p>• Review your top spending categories for optimization</p>
              <p>• {expenses.filter(e => e.isRecurring).length} recurring expenses identified</p>
              <p>• Consider automating savings to reach financial goals faster</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}