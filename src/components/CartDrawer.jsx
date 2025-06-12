// src/components/CartDrawer.jsx
import React, { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';

export default function CartDrawer({ cart, setCart, onSubmitOrder }) {
  const [open, setOpen] = useState(false);

  const handleQuantityChange = (id, value, stock) => {
    const quantity = Math.max(1, Math.min(Number(value), stock));
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="relative bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        onClick={() => setOpen(!open)}
      >
        <ShoppingCart className="w-5 h-5" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white w-full h-[90vh] sm:h-[80vh] max-w-2xl rounded-t-lg sm:rounded-lg shadow-lg flex flex-col overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <h3 className="text-lg font-semibold">Pedido actual</h3>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                El carrito está vacío.
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="border rounded p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-gray-600">{item.brand} - {item.model}</div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-red-500 text-xs ml-2">Eliminar</button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <input
                        type="number"
                        min="1"
                        max={item.stock}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value, item.stock)}
                        className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                      <span className="text-sm font-semibold text-blue-600">${(item.quantity * item.price).toLocaleString()}</span>
                    </div>
                    {item.quantity > item.stock && (
                      <p className="text-xs text-red-600 mt-1">No hay suficiente stock</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="border-t p-4 text-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-blue-600 text-lg">${total.toLocaleString()}</span>
                </div>
                <button
                  onClick={onSubmitOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                >
                  Finalizar pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
