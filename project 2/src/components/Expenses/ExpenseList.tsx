import React, { useState } from 'react';
import { Edit3, Trash2, Plus, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ExpenseForm } from './ExpenseForm';
import { Expense, ExpenseCategory } from '../../types';

export function ExpenseList() {
  const { state, dispatch } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>();
  const [filterCategory, setFilterCategory] = useState<ExpenseCategory | 'All'>('All');

  const filteredExpenses = state.expenses.filter(expense => 
    filterCategory === 'All' || expense.category === filterCategory
  );

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch({ type: 'DELETE_EXPENSE', payload: id });
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingExpense(undefined);
  };

  const categories: (ExpenseCategory | 'All')[] = [
    'All',
    'Food',
    'Travel',
    'Bills',
    'Shopping',
    'Entertainment',
    'Healthcare',
    'Others',
  ];

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Expense Tracking</h1>
          <p className="text-gray-600">Manage your daily and monthly expenses</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Filter and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as ExpenseCategory | 'All')}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {filterCategory === 'All' ? 'Total' : filterCategory} Expenses
              </p>
              <p className="text-2xl font-bold text-gray-800">
                ₹{totalAmount.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <p className="text-emerald-100 text-sm">This Month</p>
          <p className="text-2xl font-bold">{filteredExpenses.length}</p>
          <p className="text-emerald-100 text-sm">Transactions</p>
        </div>
      </div>

      {/* Expense List */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Expenses</h2>
          
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No expenses found</h3>
              <p className="text-gray-500 mb-4">
                {filterCategory === 'All' 
                  ? 'Start tracking your expenses by adding your first transaction.'
                  : `No expenses found in the ${filterCategory} category.`
                }
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Add First Expense
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredExpenses
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-600 font-medium text-sm">
                          {expense.category.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{expense.description}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{expense.category}</span>
                          <span>•</span>
                          <span>{new Date(expense.date).toLocaleDateString()}</span>
                          {expense.isRecurring && (
                            <>
                              <span>•</span>
                              <span className="text-blue-600">Recurring</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-semibold text-red-600">
                        -₹{expense.amount.toLocaleString('en-IN')}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Expense Form Modal */}
      {showForm && (
        <ExpenseForm
          expense={editingExpense}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}