import React from 'react';
import {
  Home,
  CreditCard,
  TrendingUp,
  MessageCircle,
  BarChart3,
  Settings,
  X,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'expenses', name: 'Expenses', icon: CreditCard },
  { id: 'budget', name: 'Budget Planning', icon: TrendingUp },
  { id: 'advisor', name: 'AI Advisor', icon: MessageCircle },
  { id: 'reports', name: 'Reports', icon: BarChart3 },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export function Sidebar({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 w-64 h-full bg-gradient-to-b from-emerald-50 to-emerald-100 
          transform transition-transform duration-300 ease-in-out
          md:relative md:transform-none md:transition-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <h2 className="text-lg font-bold text-emerald-800">FinanceAI</h2>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-1 rounded-lg hover:bg-emerald-200 transition-colors"
            >
              <X className="w-5 h-5 text-emerald-700" />
            </button>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                  ${
                    activeTab === item.id
                      ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                      : 'text-emerald-700 hover:bg-emerald-200 hover:transform hover:scale-105'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}