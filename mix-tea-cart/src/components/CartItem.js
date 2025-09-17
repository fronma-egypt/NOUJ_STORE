import React from 'react';

const CartItem = ({ item, onChangeQuantity, onRemove }) => {
  const handleIncrease = () => {
    onChangeQuantity(item.id, 1);
  };

  const handleDecrease = () => {
    onChangeQuantity(item.id, -1);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="cart-item">
      <div className="item-thumb-container">
        <img src={item.image || 'src/assets/images/box2.png'} alt={item.name} className="item-thumb" />
        {item.discount > 0 && <span className="discount-badge">خصم {item.discount}%</span>}
      </div>
      <div className="item-info">
        <h4 className="item-name">{item.name}</h4>
        <table className="item-details">
          <tbody>
            <tr>
              <th>الوحدة</th>
              <td>{item.unit}</td>
            </tr>
            <tr>
              <th>السعر</th>
              <td>{item.price} جنيه</td>
            </tr>
            <tr>
              <th>الكمية</th>
              <td>{item.quantity}</td>
            </tr>
            <tr>
              <th>الإجمالي</th>
              <td>{(item.price * item.quantity * (1 - item.discount / 100)).toFixed(2)} جنيه</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="item-actions">
        <button onClick={handleIncrease}>➕</button>
        <span>{item.quantity}</span>
        <button onClick={handleDecrease}>➖</button>
        <button className="remove-btn" onClick={handleRemove}>❌</button>
      </div>
    </div>
  );
};

export default CartItem;