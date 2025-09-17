import React from 'react';
import CartItem from './CartItem';

const CartList = ({ cartItems, onChangeQuantity, onRemoveItem }) => {
  return (
    <div className="cart-list">
      {Object.keys(cartItems).length === 0 ? (
        <p className="empty-message">🛒 سلة المشتريات فارغة</p>
      ) : (
        Object.keys(cartItems).map((id) => {
          const item = cartItems[id];
          return (
            <CartItem
              key={id}
              item={item}
              onChangeQuantity={onChangeQuantity}
              onRemoveItem={onRemoveItem}
            />
          );
        })
      )}
    </div>
  );
};

export default CartList;