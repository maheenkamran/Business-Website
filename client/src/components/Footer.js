import React from "react";
import "./../styles/HF.css"; // CSS file

function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} My Website. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
