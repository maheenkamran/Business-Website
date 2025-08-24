import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Login.css"; // CSS file

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("✅ Login successful!");
                console.log("User logged in:", data.user);

                // Save user to localStorage for other components
                localStorage.setItem("user", JSON.stringify(data.user));

                // Redirect based on role
                if (data.user.role === "Investor") {
                    navigate("/dashboard/investor");
                } else if (data.user.role === "Entrepreneur") {
                    navigate("/dashboard/entrepreneur");
                } else {
                    setMessage("⚠️ Unknown role");
                }
            } else {
                setMessage(`❌ ${data.message || "Login failed"}`);
            }
        } catch (err) {
            setMessage("⚠️ Error: " + err.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Login;
