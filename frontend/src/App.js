import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage.js';
import ProductListing from './pages/ProductListing/ProductListing.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Homepage />}></Route>
        <Route path="/products" element={<ProductListing/>}></Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;