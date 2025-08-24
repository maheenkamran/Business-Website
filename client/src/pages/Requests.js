// src/pages/Requests.js
import React, { useEffect, useState } from "react";
import "./../styles/Requests.css";

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get entrepreneur ID from logged-in user in localStorage
    const entrepreneurId = JSON.parse(localStorage.getItem("user"))?._id;

    useEffect(() => {
        const fetchRequests = async () => {
            if (!entrepreneurId) {
                setError("Entrepreneur not logged in");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:3000/api/requests/entrepreneur/${entrepreneurId}`
                );
                const data = await response.json();

                if (response.ok) {
                    setRequests(Array.isArray(data.requests) ? data.requests : []);
                } else {
                    setError(data.message || "Failed to fetch requests");
                }
            } catch (err) {
                setError("Error: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [entrepreneurId]);

    const updateStatus = async (requestId, newStatus) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/requests/${requestId}/status`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            const data = await response.json();
            if (response.ok) {
                setRequests((prev) =>
                    prev.map((req) =>
                        req._id === requestId ? { ...req, status: newStatus } : req
                    )
                );
            } else {
                alert(data.message || "Failed to update status");
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    if (loading) return <p>Loading collaboration requests...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="requests-page">
            <h2>Collaboration Requests</h2>
            <div className="request-cards">
                {requests.length > 0 ? (
                    requests.map((req) => (
                        <div key={req._id} className="request-card">
                            <h3>
                                {req.investor?.Fname} {req.investor?.Lname}
                            </h3>
                            <p><strong>Email:</strong> {req.investor?.email}</p>
                            <p><strong>Message:</strong> {req.message || "No message"}</p>
                            <p><strong>Status:</strong> {req.status}</p>

                            {req.status === "Pending" && (
                                <div className="request-actions">
                                    <button
                                        onClick={() => updateStatus(req._id, "Accepted")}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => updateStatus(req._id, "Rejected")}
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No collaboration requests yet.</p>
                )}
            </div>
        </div>
    );
};

export default Requests;
