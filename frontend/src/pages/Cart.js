import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../features/cartSlice';
import axios from 'axios';
import { useState } from 'react';

const Cart = () => {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const increaseQuantity = (item) => {
    dispatch(addToCart(item));
  };

  const decreaseQuantity = (item) => {
    if ((item.quantity || 1) > 1) {
      dispatch(addToCart(item));
    } else {
      dispatch(removeFromCart(item._id));
    }
  };

  const placeOrder = async () => {
    if (items.length === 0) return alert('Cart is empty!');

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/orders', {
        userEmail: 'customer@gmail.com',
        items: items.map(item => ({
          foodId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1
        })),
        totalAmount: total
      });
      alert('✅ Order placed successfully! Check /orders');
      dispatch({ type: 'cart/clearCart' });
    } catch (err) {
      alert('❌ Error placing order');
    }
    setLoading(false);
  };

//   if (items.length === 0) {
//     return (
//       <div className="cart-container">
//         <h1 className="cart-title">🛒 Your Cart</h1>
//         <div className="empty-state">
//           <div className="empty-icon">🛒</div>
//           <h2 className="empty-title">Your cart is empty</h2>
//           <p className="empty-subtitle">Add some delicious items to get started!</p>
//           <a href="/" className="empty-btn">Start Shopping</a>
//         </div>
//       </div>
//     );
//   }



if (items.length === 0) {
  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Your Cart</h1>
      <div className="empty-cart-container">
        <div className="empty-cart-content">
          <div className="empty-icon">🛒</div>
          <h2 className="empty-title">Your cart is empty</h2>
          <p className="empty-subtitle">Add some delicious items to get started!</p>
          <a href="/" className="empty-btn">
            🍕 Start Shopping
          </a>
        </div>
      </div>
    </div>
  );
}


  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Shopping Cart ({items.length} items)</h1>
      
      {/* Cart Items */}
      <div className="cart-items">
        {items.map((item, index) => (
          <div key={item._id || index} className="cart-item">
            {/* Image & Details */}
            <div className="cart-item-left">
              <img 
                src={item.image || 'https://via.placeholder.com/120?text=Food'} 
                alt={item.name} 
                className="cart-image"
              />
              <div className="cart-details">
                <h3 className="cart-name">{item.name}</h3>
                <p className="cart-price">₹{item.price}</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="quantity-controls">
              <button
                onClick={() => decreaseQuantity(item)}
                className="quantity-btn quantity-minus"
              >
                -
              </button>
              <span className="quantity-display">{item.quantity || 1}</span>
              <button
                onClick={() => increaseQuantity(item)}
                className="quantity-btn quantity-plus"
              >
                +
              </button>
            </div>

            {/* Total & Remove */}
            <div className="cart-item-right">
              <div className="item-total">₹{(item.price * (item.quantity || 1)).toFixed(2)}</div>
              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="remove-btn"
              >
                🗑️ Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="summary-card">
        <div className="summary-header">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-total">₹{total.toFixed(2)}</div>
        </div>
        
        <div className="summary-breakdown">
          <div className="summary-row">
            <span>Subtotal ({items.length} items):</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (5%):</span>
            <span>₹{(total * 0.05).toFixed(2)}</span>
          </div>
          <div className="summary-row total-row">
            <span className="total-label">Total Amount:</span>
            <span className="total-value">₹{(total * 1.05).toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={placeOrder}
          disabled={loading}
          className="place-order-btn"
        >
          {loading ? (
            <>
              <div className="loading-spinner-small"></div>
              Placing Order...
            </>
          ) : (
            <>
              ✅ Place Order 
              <span className="order-total">₹{(total * 1.05).toFixed(2)}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Cart;
