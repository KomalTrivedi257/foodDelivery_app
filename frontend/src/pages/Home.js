// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import FoodCard from '../components/FoodCard';

// const Home = () => {
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/foods')
//       .then(res => {
//         setFoods(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="container mx-auto py-20 text-center">
//         <div className="loading-spinner"></div>
//         <p className="mt-4 text-xl text-gray-600">Loading delicious foods...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       {/* Hero Section */}
//       <div className="hero-section">
//         <h1 className="hero-title">🍔 Order Delicious Food</h1>
//         <p className="hero-subtitle">
//           Discover the best food from top restaurants near you. Fresh, fast & tasty!
//         </p>
//       </div>

//       {/* Foods Grid */}
//       <div className="foods-grid">
//         {foods.length === 0 ? (
//           <div className="empty-state">
//             <h2 className="empty-title">No foods available</h2>
//             <p className="empty-subtitle">Come back later for delicious meals!</p>
//           </div>
//         ) : (
//           foods.map(food => (
//             <FoodCard key={food._id} food={food} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useEffect, useState } from 'react';
import axios from 'axios';
import FoodCard from '../components/FoodCard';

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ 10+ foods with REAL images INSTANTLY
    axios.get('http://localhost:5000/api/foods-public')
      .then(res => {
        setFoods(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Food API Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Discovering delicious foods near you...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🍔 Order Delicious Food</h1>
          <p className="hero-subtitle">
            Discover the best food from top restaurants near you. 
            Fresh, fast & tasty! Delivered in 30 mins 🚀
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">30</span>
              <span className="stat-label">Min Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Foods Grid */}
      <div className="foods-section">
        <div className="foods-header">
          <h2 className="section-title">🍕 Popular Dishes</h2>
          <p className="section-subtitle">Best sellers from top restaurants</p>
        </div>
        
        <div className="foods-grid">
          {foods.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🍽️</div>
              <h2 className="empty-title">No foods available right now</h2>
              <p className="empty-subtitle">Our chefs are preparing something delicious. Come back in a few!</p>
            </div>
          ) : (
            foods.map(food => (
              <FoodCard key={food._id} food={food} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;


