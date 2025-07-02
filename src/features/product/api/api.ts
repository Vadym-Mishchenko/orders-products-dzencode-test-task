const PRODUCTS_API_URL = 'http://localhost:5000/api/products';

export const fetchProducts = async () => {
  const response = await fetch(PRODUCTS_API_URL);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const createProduct = async (data: {
  serialNumber: number;
  isNew: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guaranteeStart: string;
  guaranteeEnd: string;
  priceValueUSD: number;
  priceValueUAH: number;
  orderId: number;
  date: string;
}) => {
  const response = await fetch(PRODUCTS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create product');
  return response.json();
};

export const updateProduct = async (
  id: number,
  data: Partial<{
    serialNumber: number;
    isNew: boolean;
    photo: string;
    title: string;
    type: string;
    specification: string;
    guaranteeStart: string;
    guaranteeEnd: string;
    priceValueUSD: number;
    priceValueUAH: number;
    orderId: number;
    date: string;
  }>,
) => {
  const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update product');
  return response.json();
};

export const deleteProduct = async (id: number) => {
  const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete product');
  return response.json();
};
