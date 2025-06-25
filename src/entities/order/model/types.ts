export interface Order {
  id: number;
  title: string;
  date: string;
}

export interface OrderState {
  orders: Order[];
}
