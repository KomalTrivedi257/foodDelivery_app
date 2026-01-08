import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { total, items } = useSelector(state => state.cart);

  return (
    <header>
      <div className="container">
        {/* Logo - LEFT */}
        <Link to="/" className="logo-box">
          <div className="logo-icon">🍕</div>
          <div className="logo-text">
            <span className="logo-main">FoodHub</span>
            <span className="logo-tagline">Fast Delivery</span>
          </div>
        </Link>

        {/* Navigation - RIGHT */}
        <div className="nav-container">
          <Link to="/orders" className="nav-link nav-orders" title="Your Orders">
            <span className="nav-icon">📋</span>
            <span className="nav-text">Orders</span>
          </Link>
          
          {/* <Link to="/cart" className="nav-link nav-cart" title="Shopping Cart">
            <div className="cart-box">
              <span className="cart-icon">🛒</span>
              <div className="cart-info">
                <span className="cart-items">{items.length}</span>
                <span className="cart-total">₹{total.toFixed(0)}</span>
              </div>
              {items.length > 0 && (
                <div className="cart-badge">{items.length}</div>
              )}
            </div>
          </Link> */}

          <Link to="/cart" className="nav-link nav-cart" title="Shopping Cart">
  <div className="cart-box">
    <span className="cart-icon">🛒</span>
    {items.length > 0 && (
      <span className="cart-badge">{items.length}</span>
    )}
  </div>
</Link>

        </div>
      </div>
    </header>
  );
};

export default Header;

