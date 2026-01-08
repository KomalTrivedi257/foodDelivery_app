const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 🔥 CORS + JSON Middleware
app.use(cors());
app.use(express.json());

// 🔥 MongoDB Connection (Graceful fallback)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fooddelivery')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('⚠️ MongoDB Error (using mock data):', err));

// 🔥 Food Schema
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  category: String,
  description: String
});
const Food = mongoose.model('Food', foodSchema);

// 🔥 Order Schema  
const orderSchema = new mongoose.Schema({
  userEmail: String,
  items: [{
    foodId: String,
    name: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

// 🔥 PUBLIC FOODS API - 10 Veg Foods (WORKS EVEN WITHOUT DB)
app.get('/api/foods-public', (req, res) => {
  const vegFoods = [
    {
      _id: "1",
      name: "🍕 Margherita Pizza",
      price: 299,
      image: "https://simplyhomecooked.com/wp-content/uploads/2023/04/Margherita-Pizza-3.jpg",
      category: "veg",
      description: "Classic Italian pizza with fresh mozzarella cheese"
    },
    {
      _id: "2",
      name: "🧀 Paneer Tikka", 
      price: 280,
      image: "https://www.carolinescooking.com/wp-content/uploads/2021/09/paneer-tikka-featured-pic-sq.jpg",
      category: "veg",
      description: "Smoky marinated paneer skewers with green chutney"
    },
    {
      _id: "3",
      name: "🥞 Masala Dosa",
      price: 180,
      image: "https://png.pngtree.com/png-vector/20250416/ourmid/pngtree-masala-dosa-with-chutneys-appealing-south-indian-breakfast-png-image_16032369.png",
      category: "veg",
      description: "Crispy fermented rice crepe with spicy potato filling"
    },
    {
      _id: "4",
      name: "🌿 Veg Biryani",
      price: 260,
      image: "https://genv.org/wp-content/uploads/2023/02/17-Vegetable-Biryani.jpg",
      category: "veg",
      description: "Fragrant basmati rice cooked with fresh vegetables"
    },
    {
      _id: "5",
      name: "🫘 Dal Makhani",
      price: 220,
      image: "https://www.greedygourmet.com/wp-content/uploads/2013/02/dal-makhani-feature.jpg",
      category: "veg",
      description: "Creamy black lentils slow cooked overnight"
    },
    {
      _id: "6",
      name: "🥗 Paneer Butter Masala",
      price: 290,
      image: "https://tse1.mm.bing.net/th/id/OIP.fgEb3K-H9k8ovUMpQhnQxgHaFj?pid=Api&P=0&h=180",
      category: "veg",
      description: "Rich creamy paneer in buttery tomato gravy"
    },
    {
      _id: "7",
      name: "🍝 Veg Pasta",
      price: 240,
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2022/02/vegan-pasta.jpg",
      category: "veg",
      description: "Penne pasta with fresh vegetables in creamy sauce"
    },
    {
      _id: "8",
      name: "🥘 Aloo Gobi",
      price: 200,
      image: "https://www.indianveggiedelight.com/wp-content/uploads/2019/05/aloo-gobi-recipe-featured.jpg",
      category: "veg",
      description: "Spiced cauliflower and potato curry"
    },
    {
      _id: "9",
      name: "🫓 Naan",
      price: 80,
      image: "https://i.pinimg.com/originals/0f/8f/fc/0f8ffcd48069083389ed5e9dfda45737.webp",
      category: "veg",
      description: "Soft tandoori flatbread"
    },
    {
      _id: "10",
      name: "🥭 Mango Lassi",
      price: 120,
      image: "https://tse2.mm.bing.net/th/id/OIP.pGQHI3XF9B756Hoqttw9kgHaHa?pid=Api&P=0&h=180",
      category: "veg",
      description: "Creamy yogurt drink with ripe mangoes"
    }
  ];
  res.json(vegFoods);
});

// 🔥 Database Routes (Admin)
app.get('/api/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/foods', async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res.json({ message: 'Food added!', food });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 Order Routes
app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: 'Order placed successfully!', orderId: order._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 DELETE Order API
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully!', deletedId: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`📱 Frontend: http://localhost:3000`);
  console.log(`🍕 Foods API: http://localhost:${PORT}/api/foods-public`);
  console.log(`📦 Orders API: http://localhost:${PORT}/api/orders`);
  console.log(`🗑️ Delete API: http://localhost:${PORT}/api/orders/:id`);
});



