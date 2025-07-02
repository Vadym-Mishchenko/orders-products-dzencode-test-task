import { ApiProduct, Product } from '../model';

type ProductWithoutId = Omit<Product, 'id'>;

export const adaptProductFromApi = (api: ApiProduct): Product => ({
  id: api.id,
  serialNumber: api.serialNumber,
  isNew: api.isNew,
  photo: api.photo,
  title: api.title,
  type: api.type,
  specification: api.specification,
  guarantee: {
    start: api.guaranteeStart,
    end: api.guaranteeEnd,
  },
  price: [
    { value: api.priceValueUSD, symbol: 'USD', isDefault: 1 },
    { value: api.priceValueUAH, symbol: 'UAH', isDefault: 0 },
  ],
  order: api.orderId ?? null,
  date: api.date,
});

export const adaptProductToApi = (product: ProductWithoutId) => ({
  serialNumber: product.serialNumber,
  isNew: product.isNew,
  photo: product.photo,
  title: product.title,
  type: product.type,
  specification: product.specification,
  guaranteeStart: product.guarantee.start,
  guaranteeEnd: product.guarantee.end,
  priceValueUSD: product.price.find((p) => p.symbol === 'USD')?.value ?? 0,
  priceValueUAH: product.price.find((p) => p.symbol === 'UAH')?.value ?? 0,
  orderId: product.order,
  date: product.date,
});
