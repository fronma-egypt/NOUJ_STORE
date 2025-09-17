export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit?: string;
  discount?: number;
}

export interface CartState {
  items: Record<string, CartItem>;
  isLoading: boolean;
  error: string | null;
}

export interface CartTotals {
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
}