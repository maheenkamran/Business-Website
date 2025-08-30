import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/InvestorDashboard.css";

const InvestorDashboard = () => {
    const [entrepreneurs, setEntrepreneurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [selectedEntrepreneur, setSelectedEntrepreneur] = useState(null);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const InvId = JSON.parse(localStorage.getItem("user"))?._id;

    useEffect(() => {
        const fetchEntrepreneurs = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/users/e");
                const data = await response.json();

                if (response.ok) {
                    setEntrepreneurs(data.entrepreneurs || []);
                } else {
                    setError(data.message || "Failed to fetch entrepreneurs");
                }
            } catch (err) {
                setError("Error: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEntrepreneurs();
    }, []);

    // ✅ open popup
    const handleMessage = (entrepreneur) => {
        setSelectedEntrepreneur(entrepreneur);
        setShowPopup(true);
    };

    // ✅ send request
    const handleSend = async () => {
        if (!selectedEntrepreneur) return;

        try {
            const response = await fetch("http://localhost:3000/api/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    investor: InvId,
                    entrepreneur: selectedEntrepreneur._id,
                    message: message || "", // optional
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setShowPopup(false);
                setMessage("");
            } else {
                alert(data.message || "Failed to send request");
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    if (loading) return <p>Loading entrepreneurs...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="investor-dashboard">

            <div className="id-header">
                <h2>Investor Dashboard</h2>
                <div onClick={() => navigate(`/profile/investor/${InvId}`)}>
                    <i className="fa-solid fa-user"></i>
                    View Your Profile
                </div>
            </div>
            <h3>All entrepreneurs:</h3>
            <div className="entrepreneur-cards">
                {entrepreneurs.length > 0 ? (
                    entrepreneurs.map((entrepreneur) => (
                        <div
                            key={entrepreneur._id}
                            className="entrepreneur-card"
                            onClick={() => navigate(`/profile/entrepreneur/${entrepreneur._id}`)}
                        >
                            <h3>
                                <i className="fa-solid fa-user"></i>
                                {entrepreneur.Fname} {entrepreneur.Lname}</h3>
                            <p><strong>Email:</strong> {entrepreneur.email}</p>
                            <p><strong>Bio:</strong> {entrepreneur.bio || "N/A"}</p>
                            <p><strong>Start Up:</strong> {entrepreneur.startupDescription || "N/A"}</p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleMessage(entrepreneur);
                                }}
                            >
                                Message / Request
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No entrepreneurs found.</p>
                )}
            </div>

            {/* ✅ Popup Modal */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h3>Send Request to {selectedEntrepreneur.Fname}</h3>
                        <textarea
                            placeholder="Enter your message (optional)"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="popup-actions">
                            <button onClick={handleSend}>Send</button>
                            <button onClick={() => setShowPopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvestorDashboard;
