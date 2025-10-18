import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ExpenseList } from './components/Expenses/ExpenseList';
import { BudgetPlanning } from './components/Budget/BudgetPlanning';
import { AIAdvisor } from './components/AIAdvisor/AIAdvisor';
import { Reports } from './components/Reports/Reports';
import { Settings } from './components/Settings/Settings';

function AppContent() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!state.isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'expenses':
        return <ExpenseList />;
      case 'budget':
        return <BudgetPlanning />;
      case 'advisor':
        return <AIAdvisor />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 md:ml-0">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;