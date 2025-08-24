import { useNavigate } from "react-router-dom";
import "./../styles/Homepage.css"; // CSS file

function Homepage() {
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <div className="slide">
                <img src="/images/pic5.jpg" alt="home-images"></img>
            </div>

            {/* Center buttons */}
            <div className="button-container">
                <button onClick={() => navigate("/login")} className="home-btn">
                    Login
                </button>
                <button onClick={() => navigate("/register")} className="home-btn">
                    Register
                </button>
            </div>

        </div>
    );
}

export default Homepage;