// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Catalog from './components/Catalog';
import Orders from './components/Orders';
import AdminPanel from './components/AdminPanel';
import { mockOrders } from './constants/mockData';

export default function App() {
  const [currentView, setCurrentView] = useState('catalog');
  const [userRole, setUserRole] = useState('seller');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(mockOrders);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} setCurrentView={setCurrentView} userRole={userRole} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-800">Modo Demo - Cambiar rol:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setUserRole('seller')}
                className={`px-3 py-1 rounded text-sm ${userRole === 'seller' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
              >
                Vendedor
              </button>
              <button
                onClick={() => setUserRole('admin')}
                className={`px-3 py-1 rounded text-sm ${userRole === 'admin' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
              >
                Administrador
              </button>
            </div>
          </div>
        </div>
      </div>

      {currentView === 'catalog' && <Catalog cart={cart} setCart={setCart} />}
      {currentView === 'orders' && <Orders orders={orders} setOrders={setOrders} />}
      {currentView === 'admin' && userRole === 'admin' && <AdminPanel orders={orders} setOrders={setOrders} />}
    </div>
  );
}