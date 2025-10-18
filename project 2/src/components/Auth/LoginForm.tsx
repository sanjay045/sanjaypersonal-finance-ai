import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockUser, mockExpenses, mockBudgets, mockInvestments } from '../../utils/mockData';

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    income: '',
    riskProfile: 'medium' as const,
  });
  const { dispatch } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - in real app, this would call an API
    const user = isLogin 
      ? mockUser 
      : {
          ...mockUser,
          name: formData.name || 'New User',
          email: formData.email,
          income: parseInt(formData.income) || 0,
          riskProfile: formData.riskProfile,
        };

    dispatch({ type: 'SET_USER', payload: user });
    
    // Load mock data
    mockExpenses.forEach(expense => {
      dispatch({ type: 'ADD_EXPENSE', payload: expense });
    });
    dispatch({ type: 'SET_BUDGETS', payload: mockBudgets });
    dispatch({ type: 'SET_INVESTMENTS', payload: mockInvestments });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform hover:scale-105 transition-transform duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">AI</span>
          </div>
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">
            Welcome to FinanceAI
          </h2>
          <p className="text-emerald-600">
            Your intelligent financial companion
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">
                  Monthly Income (₹)
                </label>
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Enter your monthly income"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">
                  Risk Profile
                </label>
                <select
                  name="riskProfile"
                  value={formData.riskProfile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                >
                  <option value="low">Conservative (Low Risk)</option>
                  <option value="medium">Balanced (Medium Risk)</option>
                  <option value="high">Aggressive (High Risk)</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-emerald-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-emerald-700 font-medium hover:text-emerald-800 transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {isLogin && (
          <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
            <p className="text-sm text-emerald-700 text-center">
              <strong>Demo:</strong> Use any email/password to login with sample data
            </p>
          </div>
        )}
      </div>
    </div>
  );
}