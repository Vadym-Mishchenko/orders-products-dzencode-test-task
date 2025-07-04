import { adaptProductFromApi, adaptProductToApi } from '../lib';
import { Product } from '../model';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');

  const data = await response.json();
  return data.map(adaptProductFromApi);
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const payload = adaptProductToApi(product);

  const response = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Failed to create product');

  const data = await response.json();
  return adaptProductFromApi(data);
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  const payload = adaptProductToApi(product as Product);

  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Failed to update product');

  const data = await response.json();
  return adaptProductFromApi(data);
};

export const deleteProduct = async (id: number) => {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete product');

  return response.json();
};
