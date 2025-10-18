import React, { useState } from 'react';
import { User, IndianRupee, Target, Shield, Bell, Palette } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Settings() {
  const { state, dispatch } = useApp();
  const { user } = state;
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    income: user?.income?.toString() || '',
    riskProfile: user?.riskProfile || 'medium',
    goals: user?.goals?.join(', ') || '',
  });

  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    expenseReminders: true,
    savingsGoals: true,
    monthlyReports: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      income: parseFloat(formData.income) || 0,
      riskProfile: formData.riskProfile as 'low' | 'medium' | 'high',
      goals: formData.goals.split(',').map(goal => goal.trim()).filter(goal => goal),
    };

    dispatch({ type: 'SET_USER', payload: updatedUser });
    alert('Profile updated successfully!');
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your profile and preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <User className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Profile Information</h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Income ($)
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risk Profile
              </label>
              <select
                name="riskProfile"
                value={formData.riskProfile}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="low">Conservative (Low Risk)</option>
                <option value="medium">Balanced (Medium Risk)</option>
                <option value="high">Aggressive (High Risk)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Financial Goals (comma-separated)
            </label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Emergency Fund, Vacation, House Down Payment, Retirement"
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Save Profile
          </button>
        </form>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
        </div>

        <div className="space-y-4">
          {Object.entries({
            budgetAlerts: 'Budget Alerts',
            expenseReminders: 'Expense Reminders',
            savingsGoals: 'Savings Goal Updates',
            monthlyReports: 'Monthly Reports',
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">{label}</p>
                <p className="text-sm text-gray-500">
                  {key === 'budgetAlerts' && 'Get notified when you exceed budget limits'}
                  {key === 'expenseReminders' && 'Daily reminders to track your expenses'}
                  {key === 'savingsGoals' && 'Updates on your progress towards savings goals'}
                  {key === 'monthlyReports' && 'Monthly financial summary reports'}
                </p>
              </div>
              <button
                onClick={() => handleNotificationChange(key as keyof typeof notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications[key as keyof typeof notifications] 
                    ? 'bg-emerald-600' 
                    : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications[key as keyof typeof notifications] 
                      ? 'translate-x-6' 
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Shield className="w-5 h-5 text-amber-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Security & Privacy</h2>
        </div>

        <div className="space-y-4">
          <button className="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            Change Password
          </button>
          <button className="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors ml-0 sm:ml-3">
            Enable Two-Factor Authentication
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-red-100 rounded-lg">
            <Target className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Data Management</h2>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Manage your financial data and account preferences.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              Export Data
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Import Data
            </button>
            <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}