// src/constants/mockData.js
export const mockParts = [
  // Repuestos comunes Venezuela (sin cambios)
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

// Función helper para calcular el total de un pedido
const calculateOrderTotal = (products) => {
  return products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
};

export const mockOrders = [
  {
    id: 1,
    customer: 'Taller Rodriguez',
    products: [
      { ...mockParts[0], quantity: 2 }, // 2 x 15000 = 30000
      { ...mockParts[1], quantity: 1 }, // 1 x 18000 = 18000
      { ...mockParts[3], quantity: 3 }  // 3 x 22000 = 66000
    ],
    // Total calculado: 30000 + 18000 + 66000 = 114000
    total: 114000,
    status: 'pending',
    date: '2024-05-31',
    vendedor: 'Juan Pérez',
    items: 3 // 2 + 1 + 3 = 6 artículos (¿O es la cantidad de líneas? Aclarar esto)
  },
  {
    id: 2,
    customer: 'Motos del Sur',
    products: [
      { ...mockParts[4], quantity: 1 }, // 1 x 95000 = 95000
      { ...mockParts[6], quantity: 5 }  // 5 x 7000 = 35000
    ],
    // Total calculado: 95000 + 35000 = 130000
    total: 130000,
    status: 'preparing',
    date: '2024-05-30',
    vendedor: 'María García',
    items: 2
  },
  {
    id: 3,
    customer: 'Repuestos Central',
    products: [
      { ...mockParts[5], quantity: 1 }, // 1 x 85000 = 85000
      { ...mockParts[8], quantity: 2 }, // 2 x 60000 = 120000
      { ...mockParts[10], quantity: 1 }, // 1 x 110000 = 110000
      { ...mockParts[12], quantity: 2 }  // 2 x 19000 = 38000
    ],
    // Total calculado: 85000 + 120000 + 110000 + 38000 = 353000
    total: 353000,
    status: 'shipped',
    date: '2024-05-29',
    vendedor: 'Carlos López',
    items: 4
  },
  {
    id: 4,
    customer: 'Taller Mechanic',
    products: [
      { ...mockParts[2], quantity: 1 } // 1 x 45000 = 45000
    ],
    total: 45000,
    status: 'delivered',
    date: '2024-05-28',
    vendedor: 'Ana Silva',
    items: 1
  },
  {
    id: 5,
    customer: 'MotoServicios C.A.',
    products: [
      { ...mockParts[7], quantity: 3 }, // 3 x 9000 = 27000
      { ...mockParts[9], quantity: 1 }, // 1 x 4000 = 4000
      { ...mockParts[11], quantity: 2 } // 2 x 16500 = 33000
    ],
    // Total calculado: 27000 + 4000 + 33000 = 64000
    total: 64000,
    status: 'pending',
    date: '2024-06-01',
    vendedor: 'Luis Mendoza',
    items: 3
  }
];

// Verificación de consistencia (opcional, para desarrollo)
mockOrders.forEach(order => {
  const calculatedTotal = calculateOrderTotal(order.products);
  if (order.total !== calculatedTotal) {
    console.warn(`¡Inconsistencia en pedido ${order.id}! Total declarado: ${order.total}, Total calculado: ${calculatedTotal}`);
  }
});