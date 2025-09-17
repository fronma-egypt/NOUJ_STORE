import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addItem, removeItem, updateQuantity, clearCart } from '../store/cartSlice';
import { CartItem, CartTotals } from '../types/cart';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state: RootState) => state.cart);

  const addToCart = (item: CartItem) => {
    dispatch(addItem(item));
  };

  const removeFromCart = (id: string) => {
    dispatch(removeItem(id));
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  const getCartTotals = (): CartTotals => {
    const subtotal = Object.values(items).reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
    
    const discountPercentage = 10; // 10% discount
    const discountAmount = subtotal * (discountPercentage / 100);
    const finalTotal = subtotal - discountAmount;

    return {
      subtotal,
      discountAmount,
      finalTotal
    };
  };

  const getCartItemsCount = (): number => {
    return Object.values(items).reduce((total, item) => total + item.quantity, 0);
  };

  const isCartEmpty = (): boolean => {
    return Object.keys(items).length === 0;
  };

  return {
    items,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCartItems,
    getCartTotals,
    getCartItemsCount,
    isCartEmpty
  };
};