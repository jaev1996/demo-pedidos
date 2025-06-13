// src/components/Catalog.jsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { mockParts } from '../constants/mockData';

const ITEMS_PER_PAGE = 8;

export default function Catalog({ cart, setCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('');

  const categories = ['all', ...new Set(mockParts.map(part => part.category))];

  const filteredParts = mockParts.filter(part => {
    const matchesSearch =
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pageCount = Math.ceil(filteredParts.length / ITEMS_PER_PAGE);
  const paginatedParts = filteredParts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
    setToastText(`${part.name} agregado al pedido.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1200);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-800">
      {showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-sm font-medium px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out">
          {toastText}
        </div>
      )}

      {/* Filtros */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar repuestos..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <select
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">Todas las categorías</option>
            {categories.slice(1).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        {paginatedParts.map(part => (
          <div key={part.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap justify-between items-start mb-3">
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full mb-2">
                  {part.category}
                </span>
                <div className={`flex items-center ${part.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${part.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-xs font-medium">
                    {part.stock > 0 ? `${part.stock} disponibles` : 'Sin stock'}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{part.name}</h3>
              <p className="text-sm text-gray-700 mb-1">{part.brand} - {part.model}</p>
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

      {/* Paginación */}
      {pageCount > 1 && (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            className="px-3 py-1 border rounded text-sm bg-white hover:bg-gray-100 disabled:text-gray-400"
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          {[...Array(pageCount)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded text-sm ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, pageCount))}
            className="px-3 py-1 border rounded text-sm bg-white hover:bg-gray-100 disabled:text-gray-400"
            disabled={currentPage === pageCount}
          >
            Siguiente
          </button>
        </div>
      )}

      <style jsx>{`
        .animate-fade-in-out {
          animation: fadeInOut 1.5s ease-in-out forwards;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-10px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
