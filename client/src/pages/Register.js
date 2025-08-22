import React, { useState } from "react";
import "../styles/Register.css";

export default function Register() {
    const [formData, setFormData] = useState({
        Fname: "",
        Lname: "",
        email: "",
        password: "",
        role: "Investor", // default role
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage(data.message || "Registration successful!");
            } else {
                setMessage(data.error || "Something went wrong");
            }
        } catch (err) {
            setMessage("Server error. Try again later.");
        }
    };

    return (
        <div className="register-container">
            <h2>Create Account</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Fname"
                    placeholder="First Name"
                    value={formData.Fname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="Lname"
                    placeholder="Last Name"
                    value={formData.Lname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {/* Role Dropdown */}
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="Investor">Investor</option>
                    <option value="Entrepreneur">Entrepreneur</option>
                </select>

                <button type="submit">Register</button>
            </form>
            {message && <p className="msg">{message}</p>}
        </div>
    );
}
