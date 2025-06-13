// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Catalog from './components/Catalog';
import Orders from './components/Orders';
import AdminPanel from './components/AdminPanel';
import CartDrawer from './components/CartDrawer';
import { mockOrders } from './constants/mockData';

export default function App() {
  const [currentView, setCurrentView] = useState('catalog');
  const [userRole, setUserRole] = useState('seller');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(mockOrders);

  const handleSubmitOrder = () => {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const newOrder = {
      id: orders.length + 1,
      customer: 'Cliente Demo',
      items: cart.length,
      total,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      vendedor: 'Usuario Actual'
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    alert('Pedido guardado correctamente.');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <Header currentView={currentView} setCurrentView={setCurrentView} userRole={userRole} />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-gray-200 border border-gray-300 rounded-lg p-4 mb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm text-gray-700">Modo Demo - Cambiar rol:</span>
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

          {currentView === 'catalog' && <Catalog cart={cart} setCart={setCart} />}
          {currentView === 'orders' && <Orders orders={orders} setOrders={setOrders} userRole={userRole} />}
          {currentView === 'admin' && userRole === 'admin' && <AdminPanel orders={orders} setOrders={setOrders} />}
        </div>
      </main>

      {currentView === 'catalog' && (
        <CartDrawer cart={cart} setCart={setCart} onSubmitOrder={handleSubmitOrder} />
      )}
    </div>
  );
}
