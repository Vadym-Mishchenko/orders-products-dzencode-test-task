import { describe, it, expect, vi } from 'vitest';
import { adaptOrderFromApi, adaptOrderToApi } from './orderAdapter';
import type { ApiOrder } from '../model/types';
import { adaptProductFromApi, ApiProduct } from '@/features';

vi.mock('@/features', () => ({
  adaptProductFromApi: vi.fn((apiProduct: ApiProduct) => ({
    id: apiProduct.id,
    title: apiProduct.title,
  })),
}));

describe('adaptOrderFromApi', () => {
  it('correctly adapts ApiOrder to Order with products', () => {
    const apiOrder: ApiOrder = {
      id: 1,
      title: 'Test Order',
      date: '2023-06-30',
      description: 'Order description',
      products: [
        {
          id: 10,
          serialNumber: 123,
          isNew: true,
          photo: 'photo1.jpg',
          title: 'Prod1',
          type: 'Monitors',
          specification: 'Spec1',
          guaranteeStart: '2023-01-01',
          guaranteeEnd: '2024-01-01',
          priceValueUSD: 100,
          priceValueUAH: 3000,
          orderId: 1,
          date: '2023-01-15',
        },
        {
          id: 11,
          serialNumber: 456,
          isNew: false,
          photo: 'photo2.jpg',
          title: 'Prod2',
          type: 'Accessories',
          specification: 'Spec2',
          guaranteeStart: '2022-05-01',
          guaranteeEnd: '2023-05-01',
          priceValueUSD: 50,
          priceValueUAH: 1500,
          orderId: 1,
          date: '2023-02-20',
        },
      ],
    };

    const expectedOrder = {
      id: 1,
      title: 'Test Order',
      date: '2023-06-30',
      description: 'Order description',
      products: [
        { id: 10, title: 'Prod1' },
        { id: 11, title: 'Prod2' },
      ],
    };

    expect(adaptOrderFromApi(apiOrder)).toEqual(expectedOrder);
    expect(adaptProductFromApi).toHaveBeenCalledTimes(2);
  });

  it('returns empty products array if products is undefined', () => {
    const apiOrder: ApiOrder = {
      id: 2,
      title: 'Empty products order',
      date: '2023-07-01',
      description: 'No products',
      products: [],
    };

    const order = adaptOrderFromApi(apiOrder);
    expect(order.products).toEqual([]);
  });
});

describe('adaptOrderToApi', () => {
  it('correctly adapts Order to ApiOrder-like object', () => {
    const order = {
      title: 'Test Order',
      date: '2023-06-30',
      description: 'Order description',
    };

    const expectedApiOrder = {
      title: 'Test Order',
      date: '2023-06-30',
      description: 'Order description',
    };

    expect(adaptOrderToApi(order)).toEqual(expectedApiOrder);
  });
});
