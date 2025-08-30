import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./../styles/InvestorProfile.css";

const InvestorProfile = () => {
    const navigate = useNavigate();

    const { id } = useParams(); // ✅ get investor id from route
    const [investor, setInvestor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/api/users/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setInvestor(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching investor profile:", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [id]); // ✅ depend on id

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (!investor) {
        return <p>No investor profile found</p>;
    }

    return (
        <div className="ip-page">
            <div className="investor-profile">
                <h2>{investor.Fname} {investor.Lname}</h2>
                <p><strong>Email:</strong> {investor.email}</p>
                <p><strong>Bio:</strong> {investor.bio || "Not provided"}</p>
                <p><strong>Investment Interests:</strong> {investor.investmentInterests || "Not provided"}</p>
                <p><strong>Portfolio Companies:</strong> {investor.portfolioCompanies?.join(", ") || "None"}</p>
                <div className="logout-i" >Logout</div>
                <div className="back-di" onClick={() => { navigate("/dashboard/investor") }}>Back to Dashboard</div></div>
        </div>
    );
};

export default InvestorProfile;
