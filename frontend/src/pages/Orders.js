import { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🔥 DELETE FUNCTION
  const deleteOrder = async (orderId) => {
    if (!window.confirm('Delete this order permanently?')) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
      alert('✅ Order deleted successfully!');
    } catch (err) {
      alert('❌ Delete failed! Try again.');
      console.error('Delete error:', err);
    }
  };

  if (loading) {
    return (
      <div className="orders-container">
        <h1 className="orders-title">📋 Your Orders</h1>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1 className="orders-title">📋 Your Orders ({orders.length})</h1>
      
      {orders.length === 0 ? (
        <div className="empty-orders-container">
          <div className="empty-orders-content">
            <div className="empty-icon">📦</div>
            <h2 className="empty-title">No orders yet</h2>
            <p className="empty-subtitle">Your order history will appear here</p>
            <a href="/" className="empty-btn">Start Ordering</a>
          </div>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              {/* Order Header */}
              <div className="order-header">
                <div className="order-info">
                  <h3 className="order-id">Order #{order._id.slice(-6).toUpperCase()}</h3>
                  <span className={`order-status status-${order.status}`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                <div className="order-date">🕒 {new Date(order.createdAt).toLocaleDateString()}</div>
              </div>

              {/* Order Total */}
              <div className="order-total-section">
                <div className="total-circle">₹{order.totalAmount}</div>
                <div className="total-label">Total Amount</div>
              </div>

              {/* Items List */}
              <div className="order-items-section">
                <h4 className="items-title">{order.items.length} Items</h4>
                <div className="items-list">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty">x{item.quantity}</span>
                      </div>
                      <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 🔥 UPDATED Action Buttons WITH DELETE */}
              <div className="order-actions">
                <button className="action-btn reorder-btn">🔄 Reorder</button>
                <button className="action-btn track-btn">📍 Track Order</button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => deleteOrder(order._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
