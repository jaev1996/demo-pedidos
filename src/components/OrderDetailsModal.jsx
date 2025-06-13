// src/components/OrderDetailsModal.jsx
import React from 'react';
import { X } from 'lucide-react';

export default function OrderDetailsModal({ order, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b border-gray-200 p-4">
                    <h3 className="text-lg font-bold">Detalles del Pedido #{order.id}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Información del Cliente</h4>
                            <div className="space-y-1 text-sm">
                                <p><span className="font-medium">Nombre:</span> {order.customer}</p>
                                <p><span className="font-medium">Fecha:</span> {order.date}</p>
                                <p><span className="font-medium">Vendedor:</span> {order.vendedor}</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Resumen del Pedido</h4>
                            <div className="space-y-1 text-sm">
                                <p><span className="font-medium">Estado:</span> {order.status}</p>
                                <p><span className="font-medium">Artículos:</span> {order.items}</p>
                                <p><span className="font-medium">Total:</span> ${order.total.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Productos</h4>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {order.products.map((product, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2">
                                                <div className="font-medium">{product.name}</div>
                                                <div className="text-sm text-gray-500">{product.brand} - {product.model}</div>
                                            </td>
                                            <td className="px-4 py-2">{product.quantity}</td>
                                            <td className="px-4 py-2">${product.price.toLocaleString()}</td>
                                            <td className="px-4 py-2">${(product.price * product.quantity).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 p-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}