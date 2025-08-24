import React, { useEffect, useState } from "react";
import "./../styles/InvestorProfile.css";

const InvestorProfile = () => {
    const [investor, setInvestor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // get the logged-in user data from localStorage
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user._id) {
            fetch(`http://localhost:3000/api/users/${user._id}`)
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
    }, []);

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (!investor) {
        return <p>No investor profile found</p>;
    }

    return (
        <div className="investor-profile">
            <h2>{investor.Fname} {investor.Lname}</h2>
            <p><strong>Email:</strong> {investor.email}</p>
            <p><strong>Bio:</strong> {investor.bio || "Not provided"}</p>
            <p><strong>Investment Interests:</strong> {investor.investmentInterests || "Not provided"}</p>
            <p><strong>Portfolio Companies:</strong> {investor.portfolioCompanies?.join(", ") || "None"}</p>
        </div>
    );
};

export default InvestorProfile;
