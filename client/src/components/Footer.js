import React from "react";
import "./../styles/HF.css"; // CSS file

function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} Business Nexus. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
