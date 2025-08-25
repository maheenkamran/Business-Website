import { useNavigate } from "react-router-dom";
import "./../styles/Homepage.css";

function Homepage() {
    const navigate = useNavigate();

    return (
        <div className="homepage">
            {/* Left Content */}
            <div className="homepage-left">
                <span className="join-text">Take the Next Step</span>
                <h1>
                    Empowering Growth Through <span className="highlight">Networking</span>
                </h1>
                <p>
                    Unlock access to a community designed for entrepreneurs and investors. Explore partnerships, pitch ideas, and form valuable connections that accelerate growth and open new doors.
                </p>
                <div className="homepage-buttons">
                    <button
                        className="btn-primary"
                        onClick={() => navigate("/register")}
                    >
                        Get Started
                    </button>
                    <button className="btn-secondary" onClick={() => navigate("/login")}>
                        Explore
                    </button>
                </div>
            </div>

            {/* Right Content */}
            <div className="homepage-right">
                <div className="profile-card">
                    <img src="/images/home-img.png" alt="Home page image" className="profile-pic" />
                </div>

            </div>
        </div>
    );
}

export default Homepage;
