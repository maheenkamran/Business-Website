import './Header.css';

function Header() {
    return (
        <div className="header-container">
            <img id="logo"src="/images/logo.png" alt="logo"></img>
            <div id="brand-name">Brand</div>
            <input id="search-bar"placeholder='Search'></input>
            <button id="search-button">Search</button>
            
            <div className="profile">
                <i id="profile-icon" className="fa-solid fa-user"></i>
                <p id="profile-text ">Profile</p>
            </div>
             <div className="message">
                <i id="message-icon" className="fa-solid fa-message"></i>
                <p id="message-text ">Message</p>
            </div>
             <div className="orders">
                <i id="orders-icon" className="fa-solid fa-heart"></i>
                <p id="orders-text ">Orders</p>
            </div>
             <div className="cart">
                <i id="cart-icon" className="fa-solid fa-cart-shopping"></i>
                <p id="cart-text ">My Cart</p>
            </div>
        </div>
    );
}

export default Header;