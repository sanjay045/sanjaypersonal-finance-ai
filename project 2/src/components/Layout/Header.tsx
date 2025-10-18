import React from 'react';
import { LogOut, User, Menu, IndianRupee } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { state, dispatch } = useApp();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <header className="bg-white shadow-sm border-b border-emerald-100">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <Menu className="w-5 h-5 text-emerald-700" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <h1 className="text-xl font-bold text-emerald-800">FinanceAI</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-emerald-700">
            <User className="w-4 h-4" />
            <span className="font-medium">{state.user?.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}