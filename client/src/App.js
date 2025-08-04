import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage.js';
import ProductListing from './pages/ProductListing/ProductListing.js'
import ProductDetails from './pages/ProductDetails/ProductDetails.js';
import Profile from './pages/Profile/Profile.js'
import Messages from './pages/Messages/Messages.js'
import Orders from './pages/Orders/Orders.js'
import Cart from './pages/Cart/Cart.js'
import Checkout from './pages/Checkout/Checkout.js';
import Admin from './pages/Admin/Admin.js';
import Signup from './pages/Signup/Signup.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Homepage />}></Route>
        <Route path="/products" element={<ProductListing />}></Route>
        <Route path="/product-details" element={<ProductDetails />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;