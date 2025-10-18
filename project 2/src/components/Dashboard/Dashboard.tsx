import React from 'react';
import { IndianRupee, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatsCard } from './StatsCard';
import { ExpenseChart } from './ExpenseChart';

export function Dashboard() {
  const { state } = useApp();
  const { user, expenses, budgets } = state;

  if (!user) return null;

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budgetAmount, 0);
  const remainingBudget = totalBudget - totalExpenses;
  const savingsRate = ((user.income - totalExpenses) / user.income) * 100;

  const recentExpenses = expenses
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">Here's your financial overview for this month.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
            <span className="text-emerald-700 text-sm font-medium">AI Analysis Active</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Monthly Income"
          value={`₹${user.income.toLocaleString('en-IN')}`}
          icon={IndianRupee}
          color="emerald"
        />
        <StatsCard
          title="Total Expenses"
          value={`₹${totalExpenses.toLocaleString('en-IN')}`}
          change="+8% from last month"
          icon={TrendingUp}
          color="red"
        />
        <StatsCard
          title="Remaining Budget"
          value={`₹${remainingBudget.toLocaleString('en-IN')}`}
          change={remainingBudget > 0 ? 'On track' : 'Over budget'}
          icon={Target}
          color="blue"
        />
        <StatsCard
          title="Savings Rate"
          value={`${savingsRate.toFixed(1)}%`}
          change={savingsRate >= 20 ? 'Excellent!' : 'Can improve'}
          icon={TrendingDown}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Chart */}
        <div className="lg:col-span-2">
          <ExpenseChart expenses={expenses} />
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Transactions</h3>
          <div className="space-y-4">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-800">{expense.description}</p>
                  <p className="text-sm text-gray-500">{expense.category}</p>
                </div>
                <span className="font-semibold text-red-600">
                  -₹{expense.amount.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
            {recentExpenses.length === 0 && (
              <p className="text-gray-500 text-center py-4">No recent transactions</p>
            )}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">💡 AI Financial Insight</h3>
            <p className="text-emerald-100 mb-4">
              Based on your spending patterns, you're doing well with your {user.riskProfile} risk profile.
              {savingsRate >= 20 
                ? " Consider increasing your investment allocation to maximize growth potential."
                : " Try to increase your savings rate by optimizing your largest expense categories."
              }
            </p>
            <button className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
              Get Detailed Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}