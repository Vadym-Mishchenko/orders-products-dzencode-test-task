export interface ProductPrice {
  value: number;
  symbol: string;
  isDefault: 0 | 1;
}

export interface Guarantee {
  start: string;
  end: string;
}

export interface Product {
  id: number;
  serialNumber: number;
  isNew: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: Guarantee;
  price: ProductPrice[];
  order: number | null;
  date: string;
}

export interface ApiProduct {
  id: number;
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
  orderId: number | null;
  date: string;
}
