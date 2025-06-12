// src/components/Catalog.jsx
import React, { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { mockParts } from '../constants/mockData';

export default function Catalog({ cart, setCart }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', ...new Set(mockParts.map(part => part.category))];

    const filteredParts = mockParts.filter(part => {
        const matchesSearch =
            part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            part.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            part.model.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const addToCart = (part) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === part.id);
            if (existing) {
                return prev.map(item =>
                    item.id === part.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...part, quantity: 1 }];
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Filtros */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Buscar repuestos..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">Todas las categorías</option>
                        {categories.slice(1).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Carrito */}
            {cart.length > 0 && (
                <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-50">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">Carrito</h3>
                        <ShoppingCart className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">{cart.length} artículos</p>
                    <p className="text-lg font-bold text-blue-600">
                        ${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}
                    </p>
                </div>
            )}

            {/* Productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredParts.map(part => (
                    <div key={part.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                    {part.category}
                                </span>
                                <div className={`flex items-center ${part.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    <div className={`w-2 h-2 rounded-full mr-2 ${part.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <span className="text-xs font-medium">
                                        {part.stock > 0 ? `${part.stock} disponibles` : 'Sin stock'}
                                    </span>
                                </div>
                            </div>

                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{part.name}</h3>
                            <p className="text-sm text-gray-600 mb-1">{part.brand} - {part.model}</p>
                            <p className="text-xl font-bold text-blue-600 mb-4">${part.price.toLocaleString()}</p>

                            <button
                                onClick={() => addToCart(part)}
                                disabled={part.stock === 0}
                                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${part.stock > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            >
                                {part.stock > 0 ? 'Agregar al pedido' : 'Sin stock'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
