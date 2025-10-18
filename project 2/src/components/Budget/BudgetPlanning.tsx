import React from 'react';
import { Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getBudgetRecommendation } from '../../utils/aiAdvisor';

export function BudgetPlanning() {
  const { state } = useApp();
  const { user, expenses, budgets } = state;

  if (!user) return null;

  const categoryExpenses = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const budgetAnalysis = budgets.map(budget => {
    const spent = categoryExpenses[budget.category] || 0;
    const percentage = (spent / budget.budgetAmount) * 100;
    const remaining = budget.budgetAmount - spent;
    
    return {
      ...budget,
      spent,
      percentage: Math.min(percentage, 100),
      remaining,
      status: percentage > 100 ? 'over' : percentage > 80 ? 'warning' : 'good'
    };
  });

  const recommendations = [
    'Food',
    'Bills',
    'Entertainment',
    'Shopping',
    'Healthcare'
  ].map(category => ({
    category,
    recommended: getBudgetRecommendation(user.income, category),
    current: categoryExpenses[category] || 0,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Budget Planning</h1>
          <p className="text-gray-600">Track your spending against your budget goals</p>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Budget</h3>
          <p className="text-2xl font-bold text-gray-800">
            ₹{budgets.reduce((sum, b) => sum + b.budgetAmount, 0).toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Spent</h3>
          <p className="text-2xl font-bold text-gray-800">
            ₹{Object.values(categoryExpenses).reduce((sum, amount) => sum + amount, 0).toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Categories On Track</h3>
          <p className="text-2xl font-bold text-gray-800">
            {budgetAnalysis.filter(b => b.status === 'good').length}/{budgetAnalysis.length}
          </p>
        </div>
      </div>

      {/* Current Budget Status */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Current Budget Status</h2>
        
        <div className="space-y-4">
          {budgetAnalysis.map((budget) => (
            <div key={budget.id} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    budget.status === 'over' ? 'bg-red-100' : 
                    budget.status === 'warning' ? 'bg-amber-100' : 'bg-emerald-100'
                  }`}>
                    {budget.status === 'over' ? (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    ) : budget.status === 'warning' ? (
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{budget.category}</h3>
                    <p className="text-sm text-gray-500">
                      ₹{budget.spent.toLocaleString('en-IN')} of ₹{budget.budgetAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${
                    budget.remaining >= 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    ₹{Math.abs(budget.remaining).toLocaleString('en-IN')} {budget.remaining >= 0 ? 'left' : 'over'}
                  </p>
                  <p className="text-sm text-gray-500">{budget.percentage.toFixed(1)}% used</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    budget.status === 'over' ? 'bg-red-500' : 
                    budget.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Budget Recommendations */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">💡 AI Budget Recommendations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.category} className="border border-gray-200 rounded-xl p-4 hover:border-emerald-200 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-800">{rec.category}</h3>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  rec.current > rec.recommended 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {rec.current > rec.recommended ? 'Over' : 'Under'} Budget
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Recommended:</span>
                  <span className="font-medium">₹{rec.recommended.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Current Spending:</span>
                  <span className="font-medium">₹{rec.current.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Difference:</span>
                  <span className={`font-medium ${
                    rec.current > rec.recommended ? 'text-red-600' : 'text-emerald-600'
                  }`}>
                    {rec.current > rec.recommended ? '+' : '-'}₹{Math.abs(rec.current - rec.recommended).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}