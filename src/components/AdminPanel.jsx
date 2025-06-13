// src/components/AdminPanel.jsx
import React from 'react';
import { BarChart3, AlertCircle, Package } from 'lucide-react';

export default function AdminPanel({ orders, setOrders }) {
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const preparingOrders = orders.filter(order => order.status === 'preparing');

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const stats = {
    total: orders.length,
    pending: pendingOrders.length,
    preparing: preparingOrders.length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    revenue: orders.reduce((sum, order) => sum + order.total, 0)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-800">
      <h2 className="text-2xl font-bold mb-8 text-center sm:text-left">Panel de Administración</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <InfoCard icon={<BarChart3 className="h-8 w-8 text-blue-600" />} label="Total Pedidos" value={stats.total} />
        <InfoCard icon={<AlertCircle className="h-8 w-8 text-yellow-600" />} label="Pendientes" value={stats.pending} />
        <InfoCard icon={<Package className="h-8 w-8 text-blue-600" />} label="Preparando" value={stats.preparing} />
        <InfoCard icon={<BarChart3 className="h-8 w-8 text-green-600" />} label="Ingresos" value={`$${stats.revenue.toLocaleString()}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OrderSection
          title="Pedidos Pendientes"
          orders={pendingOrders}
          buttonText="Iniciar Preparación"
          buttonColor="blue"
          onClick={(id) => updateOrderStatus(id, 'preparing')}
        />

        <OrderSection
          title="En Preparación"
          orders={preparingOrders}
          buttonText="Marcar Enviado"
          buttonColor="green"
          onClick={(id) => updateOrderStatus(id, 'shipped')}
        />
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center">
        {icon}
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}

function OrderSection({ title, orders, buttonText, buttonColor, onClick }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="p-6 space-y-4">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No hay pedidos</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-${buttonColor}-50 rounded-lg gap-4`}>
              <div>
                <p className="font-medium text-gray-800">#{order.id} - {order.customer}</p>
                <p className="text-sm text-gray-600">${order.total.toLocaleString()}</p>
              </div>
              <button
                onClick={() => onClick(order.id)}
                className={`w-full sm:w-auto px-4 py-2 bg-${buttonColor}-600 text-white rounded-lg hover:bg-${buttonColor}-700 transition-colors`}
              >
                {buttonText}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
