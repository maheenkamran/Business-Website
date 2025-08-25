import React from "react";
import { Link } from "react-router-dom";
import "./../styles/HF.css"; // CSS file
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <h1 className="logo" onClick={() => { navigate("/") }}>Business Nexus</h1>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/messages">Messages</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
