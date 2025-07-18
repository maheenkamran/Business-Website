import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import './Homepage.css';

function Homepage() {
  const navigate = useNavigate();

  const handlecategory = (category) => {navigate(`/products?category=${category}`);
  }

  return (
    <>
      <Header />
      <div className="slide">
        <img src="/images/Pic3.jpg" alt="home-images"></img>
      </div>
      <div id="title"><h>Choose your category</h></div>

      <div className="categories">
        <div className="c-name" onClick={()=>{handlecategory('Home')}}>
          <i className="c-icon fa-solid fa-house"></i>
          <p className="c-title">Home</p>
        </div>
        <div className="c-name" onClick={()=>{handlecategory('Accessories')}}>
          <i className="c-icon fa-solid fa-gem"></i>
          <p className="c-title">Accessories</p>
        </div>
        <div className="c-name" onClick={()=>{handlecategory('Clothing')}}>
          <i className="c-icon fa-solid fa-shirt"></i>
          <p className="c-title">Clothing</p>
        </div>
        <div className="c-name" onClick={()=>{handlecategory('Furniture')}}>
          <i className="c-icon fa-solid fa-couch"></i>
          <p className="c-title">Furniture</p>
        </div>
        <div className="c-name" onClick={()=>{handlecategory('Electronics')}}>
          <i className="c-icon fa-solid fa-computer"></i>
          <p className="c-title">Electronics</p>
        </div>
        <div className="c-name" onClick={()=>{handlecategory('Sports')}}>
          <i className="c-icon fa-solid fa-baseball-bat-ball"></i>
          <p className="c-title">Sports</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;