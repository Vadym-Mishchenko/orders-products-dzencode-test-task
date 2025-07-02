import { describe, it, expect } from 'vitest';
import type { ApiProduct, Product } from '../model';
import { adaptProductFromApi, adaptProductToApi } from './productAdapter';

describe('adaptProductFromApi', () => {
  it('correctly adapts ApiProduct to Product', () => {
    const apiProduct: ApiProduct = {
      id: 1,
      serialNumber: 123,
      isNew: true,
      photo: 'photo.jpg',
      title: 'Test Product',
      type: 'Monitors',
      specification: 'Spec details',
      guaranteeStart: '2023-01-01',
      guaranteeEnd: '2024-01-01',
      priceValueUSD: 100,
      priceValueUAH: 3000,
      orderId: 10,
      date: '2023-06-30',
    };

    const expectedProduct: Product = {
      id: 1,
      serialNumber: 123,
      isNew: true,
      photo: 'photo.jpg',
      title: 'Test Product',
      type: 'Monitors',
      specification: 'Spec details',
      guarantee: {
        start: '2023-01-01',
        end: '2024-01-01',
      },
      price: [
        { value: 100, symbol: 'USD', isDefault: 1 },
        { value: 3000, symbol: 'UAH', isDefault: 0 },
      ],
      order: 10,
      date: '2023-06-30',
    };

    expect(adaptProductFromApi(apiProduct)).toEqual(expectedProduct);
  });

  it('sets order to null if orderId is null', () => {
    const apiProduct: ApiProduct = {
      id: 2,
      serialNumber: 456,
      isNew: false,
      photo: 'photo2.jpg',
      title: 'Another Product',
      type: 'Accessories',
      specification: 'Other specs',
      guaranteeStart: '2022-05-01',
      guaranteeEnd: '2023-05-01',
      priceValueUSD: 50,
      priceValueUAH: 1500,
      orderId: null,
      date: '2023-06-01',
    };

    const result = adaptProductFromApi(apiProduct);
    expect(result.order).toBeNull();
  });
});

describe('adaptProductToApi', () => {
  it('correctly adapts ProductWithoutId to ApiProduct-like object', () => {
    const productWithoutId = {
      serialNumber: 123,
      isNew: true,
      photo: 'photo.jpg',
      title: 'Test Product',
      type: 'Monitors',
      specification: 'Spec details',
      guarantee: {
        start: '2023-01-01',
        end: '2024-01-01',
      },
      price: [
        { value: 100, symbol: 'USD', isDefault: 1 as const },
        { value: 3000, symbol: 'UAH', isDefault: 0 as const },
      ],
      order: 10,
      date: '2023-06-30',
    };

    const expectedApiObject = {
      serialNumber: 123,
      isNew: true,
      photo: 'photo.jpg',
      title: 'Test Product',
      type: 'Monitors',
      specification: 'Spec details',
      guaranteeStart: '2023-01-01',
      guaranteeEnd: '2024-01-01',
      priceValueUSD: 100,
      priceValueUAH: 3000,
      orderId: 10,
      date: '2023-06-30',
    };

    expect(adaptProductToApi(productWithoutId)).toEqual(expectedApiObject);
  });

  it('defaults missing price values to 0', () => {
    const productWithoutId = {
      serialNumber: 111,
      isNew: false,
      photo: 'photo3.jpg',
      title: 'No Price Product',
      type: 'Laptops',
      specification: 'Specs',
      guarantee: {
        start: '2022-01-01',
        end: '2023-01-01',
      },
      price: [],
      order: 5,
      date: '2023-05-01',
    };

    const result = adaptProductToApi(productWithoutId);
    expect(result.priceValueUSD).toBe(0);
    expect(result.priceValueUAH).toBe(0);
  });
});
