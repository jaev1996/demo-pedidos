// src/constants/mockData.js
export const mockParts = [
  { id: 1, name: 'Filtro de Aire Honda CB600', brand: 'Honda', model: 'CB600', price: 45000, stock: 15, category: 'Filtros' },
  { id: 2, name: 'Pastillas de Freno Yamaha R6', brand: 'Yamaha', model: 'R6', price: 85000, stock: 8, category: 'Frenos' },
  { id: 3, name: 'Cadena 520 Kawasaki Ninja', brand: 'Kawasaki', model: 'Ninja 250', price: 120000, stock: 0, category: 'Transmisión' },
  { id: 4, name: 'Bujía NGK Honda CBR', brand: 'Honda', model: 'CBR 1000', price: 25000, stock: 25, category: 'Motor' },
  { id: 5, name: 'Aceite Motul 10W40', brand: 'Motul', model: 'Universal', price: 35000, stock: 50, category: 'Lubricantes' },
];

export const mockOrders = [
  { id: 1, customer: 'Taller Rodriguez', items: 3, total: 155000, status: 'pending', date: '2024-05-31', vendedor: 'Juan Pérez' },
  { id: 2, customer: 'Motos del Sur', items: 2, total: 70000, status: 'preparing', date: '2024-05-30', vendedor: 'María García' },
  { id: 3, customer: 'Repuestos Central', items: 5, total: 220000, status: 'shipped', date: '2024-05-29', vendedor: 'Carlos López' },
  { id: 4, customer: 'Taller Mechanic', items: 1, total: 45000, status: 'delivered', date: '2024-05-28', vendedor: 'Ana Silva' },
];
