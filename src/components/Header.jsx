// src/components/Header.jsx
import React from 'react';
import { Package, Users } from 'lucide-react';

export default function Header({ currentView, setCurrentView, userRole }) {
  const tabs = [
    { key: 'catalog', label: 'Catálogo' },
    { key: 'orders', label: 'Pedidos' },
    ...(userRole === 'admin' ? [{ key: 'admin', label: 'Administración' }] : []),
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4 sm:gap-0">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">MotoPartes Pro</h1>
          </div>
          <nav className="flex flex-wrap justify-center sm:justify-start space-x-2">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setCurrentView(tab.key)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${currentView === tab.key ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {userRole === 'admin' ? 'Administrador' : 'Vendedor'}
            </span>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
