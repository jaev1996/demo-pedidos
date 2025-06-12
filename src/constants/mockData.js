// src/constants/mockData.js
export const mockParts = [
  // Repuestos comunes Venezuela
  { id: 1, name: 'Filtro de Aire Empire Horse', brand: 'Empire', model: 'Horse 150', price: 15000, stock: 20, category: 'Filtros' },
  { id: 2, name: 'Pastillas de Freno Bera Socialista', brand: 'Bera', model: 'Socialista 150', price: 18000, stock: 12, category: 'Frenos' },
  { id: 3, name: 'Batería 12V Keeway Arsen', brand: 'Keeway', model: 'Arsen 150', price: 45000, stock: 7, category: 'Eléctrico' },
  { id: 4, name: 'Aceite 20W50 Yamaha Crypton', brand: 'Yamaha', model: 'Crypton', price: 22000, stock: 30, category: 'Lubricantes' },
  { id: 5, name: 'Caucho Trasero 130/70-17 RKV', brand: 'Keeway', model: 'RKV 200', price: 95000, stock: 10, category: 'Neumáticos' },
  { id: 6, name: 'Kit de Arrastre Honda CGL125', brand: 'Honda', model: 'CGL125', price: 85000, stock: 15, category: 'Transmisión' },
  { id: 7, name: 'Bombillo Farol Suzuki EN125', brand: 'Suzuki', model: 'EN125', price: 7000, stock: 50, category: 'Eléctrico' },
  { id: 8, name: 'Filtro de Gasolina Bera SBR', brand: 'Bera', model: 'SBR', price: 9000, stock: 35, category: 'Filtros' },
  { id: 9, name: 'Amortiguador Trasero TX200', brand: 'Empire', model: 'TX200', price: 60000, stock: 8, category: 'Suspensión' },
  { id: 10, name: 'Leva de Embrague RX115', brand: 'Yamaha', model: 'RX115', price: 4000, stock: 25, category: 'Embrague' },
  { id: 11, name: 'Cilindro Completo GL125', brand: 'Honda', model: 'GL125', price: 110000, stock: 5, category: 'Motor' },
  { id: 12, name: 'Pastillas de Freno YBR125', brand: 'Yamaha', model: 'YBR125', price: 16500, stock: 14, category: 'Frenos' },
  { id: 13, name: 'Aceite 10W40 Semi Sintético', brand: 'Venoco', model: 'Universal', price: 19000, stock: 60, category: 'Lubricantes' },
  { id: 14, name: 'Caucho Delantero 90/90-18', brand: 'Pirelli', model: 'Universal', price: 87000, stock: 9, category: 'Neumáticos' },
  { id: 15, name: 'Kit de Empacaduras Arsen 150', brand: 'Keeway', model: 'Arsen 150', price: 32000, stock: 13, category: 'Motor' },
];

export const mockOrders = [
  { id: 1, customer: 'Taller Rodriguez', items: 3, total: 155000, status: 'pending', date: '2024-05-31', vendedor: 'Juan Pérez' },
  { id: 2, customer: 'Motos del Sur', items: 2, total: 70000, status: 'preparing', date: '2024-05-30', vendedor: 'María García' },
  { id: 3, customer: 'Repuestos Central', items: 5, total: 220000, status: 'shipped', date: '2024-05-29', vendedor: 'Carlos López' },
  { id: 4, customer: 'Taller Mechanic', items: 1, total: 45000, status: 'delivered', date: '2024-05-28', vendedor: 'Ana Silva' },
];
