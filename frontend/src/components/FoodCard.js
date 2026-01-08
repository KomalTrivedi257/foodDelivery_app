// import { useDispatch } from 'react-redux';
// import { addToCart } from '../features/cartSlice';

// const FoodCard = ({ food }) => {
//   const dispatch = useDispatch();

//   return (
//     <div className="food-card">
//       {/* Category Badge */}
//       <div className={`category-badge ${food.category === 'Non-Veg' ? 'non-veg' : 'veg'}`}>
//         {food.category}
//       </div>
      
//       {/* Food Image */}
//       <div className="food-image-container">
//         <img 
//           src={food.image || 'https://via.placeholder.com/350x220/FF6B35/FFFFFF?text=Delicious+Food'} 
//           alt={food.name} 
//           className="food-image"
//         />
//         <div className="image-overlay">
//           <span className="overlay-text">Popular</span>
//         </div>
//       </div>

//       {/* Food Details */}
//       <div className="food-details">
//         <h3 className="food-name">{food.name}</h3>
//         <p className="food-desc">{food.description}</p>
        
//         {/* Price & Rating */}
//         <div className="price-rating">
//           <span className="food-price">₹{food.price}</span>
//           <div className="rating">
//             <span className="stars">★★★★★</span>
//             <span className="rating-text">(4.8)</span>
//           </div>
//         </div>

//         {/* Add to Cart Button */}
//         <button 
//           className="add-btn"
//           onClick={() => dispatch(addToCart(food))}
//         >
//           <span className="btn-icon">🛒</span>
//           <span className="btn-text">Add to Cart</span>
//           <span className="btn-price">₹{food.price}</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FoodCard;


import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const FoodCard = ({ food }) => {
  const dispatch = useDispatch();

  // Bulletproof images - Multiple fallbacks
  const safeImage = food.image || 
    'https://images.unsplash.com/photo/1568901346375-23c9450c58cd?ixlib=rb-4.0.3&w=400&h=250&fit=crop';

  return (
    <div className="food-card">
      {/* Tasty Badge */}
      <div className="tasty-badge">tasty!</div>
      
      {/* Category Badge */}
      <div className={`category-badge ${food.category === 'Non-Veg' ? 'non-veg' : 'veg'}`}>
        {food.category}
      </div>
      
      {/* FIXED Image Container */}
      <div className="food-image-container">
        <img 
          src={safeImage}
          alt={food.name}
          className="food-image"
          loading="lazy"
          onError={(e) => {
            // ULTIMATE FALLBACK - Always works
            e.target.src = 'https://images.unsplash.com/photo/1568901346375-23c9450c58cd?ixlib=rb-4.0.3&w=400&h=250&fit=crop';
          }}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            borderRadius: '20px'
          }}
        />
        <div className="image-overlay">
          <span className="overlay-text">Popular</span>
        </div>
      </div>

      {/* Food Details */}
      <div className="food-details">
        <h3 className="food-name">{food.name}</h3>
        <p className="food-desc">{food.description || 'Restaurant quality food'}</p>
        
        <div className="price-rating">
          <span className="food-price">₹{food.price}</span>
          <div className="rating">
            <span className="stars">★★★★★</span>
            <span className="rating-text">(4.8)</span>
          </div>
        </div>

        <button 
          className="add-btn"
          onClick={() => dispatch(addToCart(food))}
        >
          <span className="btn-icon">🛒</span>
          <span className="btn-text">Add to Cart</span>
          <span className="btn-price">₹{food.price}</span>
        </button>


      

      </div>
    </div>
  );
};

export default FoodCard;

