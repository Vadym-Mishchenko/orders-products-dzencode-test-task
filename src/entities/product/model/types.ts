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
  isNew: 0 | 1;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: Guarantee;
  price: ProductPrice[];
  order: number; // ID прихода
  date: string;
}
