import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")); //user is now storing an object

    const navigateCategory = (category) => {
        navigate(`/products?category=${category}`);
    }

    return (
        <>
            <div className="header-container">
                <img id="logo" src="/images/icon.png" alt="logo"></img>
                <div id="brand-name" onClick={() => (navigate("/"))}>BRAND</div>
                <input id="search-bar" placeholder='Search'></input>
                <button id="search-button">Search</button>

                <div className="profile" onClick={() => { navigate(`/profile`) }}>
                    <i id="profile-icon" className="fa-solid fa-user"></i>
                    <p id="profile-text ">Profile</p>
                </div>
                <div className="message" onClick={() => { navigate(`/messages`) }}>
                    <i id="message-icon" className="fa-solid fa-message"></i>
                    <p id="message-text ">Messages</p>
                </div>
                <div className="cart" onClick={() => { navigate(`/cart?id=${user._id}`) }}>
                    <i id="cart-icon" className="fa-solid fa-cart-shopping"></i>
                    <p id="cart-text ">My Cart</p>
                </div>
            </div>

            <div className='bottom-header'>
                <div className='all-category-menu'>
                    <i className="fa-solid fa-bars"></i>
                    <p>All category</p>

                    <div className='category-container'>
                        <div className='c-type' onClick={() => { navigateCategory('Home') }}>Home</div>
                        <div className='c-type' onClick={() => { navigateCategory('Accessories') }}>Accessories</div>
                        <div className='c-type' onClick={() => { navigateCategory('Clothing') }}>Clothing</div>
                        <div className='c-type' onClick={() => { navigateCategory('Furniture') }}>Furniture</div>
                        <div className='c-type' onClick={() => { navigateCategory('Electronics') }}>Electronics</div>
                        <div className='c-type' onClick={() => { navigateCategory('Sports') }}>Sports</div>
                    </div>
                </div>
                <div className="deliver-text">Deliver To</div>
                <img className="flag-image" src=" /images/pak-flag.png" alt="flag"></img>

            </div >

        </>
    );
}

export default Header;