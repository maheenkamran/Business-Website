import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage.js';
import ProductListing from './pages/ProductListing/ProductListing.js'
import ProductDetails from './pages/ProductDetails/ProductDetails.js';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Homepage />}></Route>
        <Route path="/products" element={<ProductListing />}></Route>
        <Route path="/product-details" element={<ProductDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;