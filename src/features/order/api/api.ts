const API_URL = 'http://localhost:5000/api/orders';

export const fetchOrders = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch orders');
  return response.json();
};

export const createOrder = async (data: { title: string; description: string; date: string }) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create order');
  return response.json();
};

export const updateOrder = async (
  id: number,
  data: { title: string; description: string; date: string },
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update order');
  return response.json();
};

export const deleteOrder = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete order');
  return response.json();
};
