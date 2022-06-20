import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddProducts from './components/AddProducts';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ShoppingCart from './components/ShoppingCart';
import Signup from './components/Signup';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/addproducts" element={<AddProducts />} />
        <Route exact path="/cart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}

export default App;
