import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./../styles/EntrepreneurProfile.css";

const EntrepreneurProfile = () => {
    const { id } = useParams(); // ✅ get entrepreneur id from route
    const [entrepreneur, setEntrepreneur] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/api/users/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setEntrepreneur(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching entrepreneur profile:", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [id]);

    if (loading) return <p>Loading profile...</p>;
    if (!entrepreneur) return <p>No entrepreneur profile found</p>;

    return (
        <div className="entrepreneur-profile">
            <h2>{entrepreneur.Fname} {entrepreneur.Lname}</h2>
            <p><strong>Email:</strong> {entrepreneur.email}</p>

            <h3>Bio</h3>
            <p>{entrepreneur.bio || "Bio not provided"}</p>

            <h3>Startup Description</h3>
            <p>{entrepreneur.startupDescription || "No startup description available"}</p>

            <h3>Funding Need</h3>
            <p>{entrepreneur.fundingNeed ? `$${entrepreneur.fundingNeed}` : "Not specified"}</p>

            <h3>Pitch Deck</h3>
            {entrepreneur.pitchDeck ? (
                <a href={entrepreneur.pitchDeck} target="_blank" rel="noopener noreferrer">
                    View Pitch Deck
                </a>
            ) : (
                <p>No pitch deck uploaded</p>
            )}
        </div>
    );
};

export default EntrepreneurProfile;
