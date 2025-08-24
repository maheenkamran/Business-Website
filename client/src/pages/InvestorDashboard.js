import React, { useEffect, useState } from "react";
import "./../styles/InvestorDashboard.css";

const InvestorDashboard = () => {
    const [entrepreneurs, setEntrepreneurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    const handleMessage = (entrepreneurId) => {
        alert(`Send message/request to entrepreneur ID: ${entrepreneurId}`);
    };

    if (loading) return <p>Loading entrepreneurs...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="investor-dashboard">
            <h2>Investor Dashboard</h2>
            <div className="entrepreneur-cards">
                {entrepreneurs.length > 0 ? (
                    entrepreneurs.map((entrepreneur) => (
                        <div key={entrepreneur._id} className="entrepreneur-card">
                            <h3>{entrepreneur.Fname} {entrepreneur.Lname}</h3>
                            <p><strong>Email:</strong> {entrepreneur.email}</p>
                            <p><strong>Startup:</strong> {entrepreneur.startup || "N/A"}</p>
                            <p><strong>Pitch Summary:</strong> {entrepreneur.pitch || "N/A"}</p>
                            <button onClick={() => handleMessage(entrepreneur._id)}>Message / Request</button>
                        </div>
                    ))
                ) : (
                    <p>No entrepreneurs found.</p>
                )}
            </div>
        </div>
    );
};

export default InvestorDashboard;
