// src/components/Orders.jsx
import React, { useState } from 'react';
import { AlertCircle, Package, Truck, Check, Eye, X, CheckCircle } from 'lucide-react';
import OrderDetailsModal from './OrderDetailsModal'; // Nuevo componente que crearemos

const statusConfig = {
    pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
    preparing: { label: 'Preparando', color: 'bg-blue-100 text-blue-800', icon: Package },
    shipped: { label: 'Enviado', color: 'bg-purple-100 text-purple-800', icon: Truck },
    delivered: { label: 'Entregado', color: 'bg-green-100 text-green-800', icon: Check },
};

export default function Orders({ orders, setOrders, userRole }) {
    const [filter, setFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showConfirm, setShowConfirm] = useState({ show: false, action: null, orderId: null });

    const filteredOrders = orders.filter(order =>
        filter === 'all' || order.status === filter
    );

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
        setShowConfirm({ show: false, action: null, orderId: null });
    };

    const cancelableStatuses = ['pending', 'preparing'];
    const canMarkAsDelivered = (status) => status === 'shipped' && userRole === 'admin';

    const showConfirmation = (action, orderId) => {
        setShowConfirm({ show: true, action, orderId });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-800">
            {/* Modal de confirmación */}
            {showConfirm.show && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4">
                            Confirmar acción
                        </h3>
                        <p className="mb-6">
                            {showConfirm.action === 'delivered'
                                ? '¿Marcar este pedido como entregado?'
                                : '¿Cancelar este pedido?'}
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowConfirm({ show: false, action: null, orderId: null })}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleStatusChange(
                                    showConfirm.orderId,
                                    showConfirm.action === 'delivered' ? 'delivered' : 'cancelled'
                                )}
                                className={`px-4 py-2 rounded-lg text-white ${showConfirm.action === 'delivered'
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-red-600 hover:bg-red-700'
                                    }`}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de detalles del pedido */}
            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold">Gestión de Pedidos</h2>
                <select
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">Todos los estados</option>
                    <option value="pending">Pendientes</option>
                    <option value="preparing">Preparando</option>
                    <option value="shipped">Enviados</option>
                    <option value="delivered">Entregados</option>
                </select>
            </div>

            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase">Pedido</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase">Cliente</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase">Vendedor</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase">Total</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase">Estado</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredOrders.map(order => {
                            const StatusIcon = statusConfig[order.status]?.icon || AlertCircle;
                            return (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="text-gray-800 font-medium">#{order.id}</div>
                                        <div className="text-gray-600">{order.date}</div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="text-gray-800">{order.customer}</div>
                                        <div className="text-gray-600">{order.items} artículos</div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">{order.vendedor}</td>
                                    <td className="px-4 py-3 whitespace-nowrap font-medium text-blue-600">${order.total.toLocaleString()}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[order.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                                            <StatusIcon className="w-3 h-3 mr-1" />
                                            {statusConfig[order.status]?.label || order.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap space-x-2">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="text-blue-600 hover:text-blue-900"
                                            title="Ver detalles"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>

                                        {canMarkAsDelivered(order.status) && (
                                            <button
                                                onClick={() => showConfirmation('delivered', order.id)}
                                                className="text-green-600 hover:text-green-900"
                                                title="Marcar como entregado"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                        )}

                                        {cancelableStatuses.includes(order.status) && (
                                            <button
                                                onClick={() => showConfirmation('cancel', order.id)}
                                                className="text-red-600 hover:text-red-900"
                                                title="Cancelar pedido"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}