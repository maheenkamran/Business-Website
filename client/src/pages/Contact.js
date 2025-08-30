import React, { useState } from "react";
import "./../styles/Contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("Thank you! Your message has been sent.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="contact-page">
            <header className="contact-header">
                <h1>Contact Us</h1>
            </header>

            <main className="contact-container">
                <p>
                    Have questions or want to connect? Fill out the form below and we’ll
                    get back to you soon.
                </p>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Message
                        <textarea
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </label>

                    <button type="submit">Send Message</button>
                </form>

                {status && <p className="status">{status}</p>}
            </main>


        </div>
    );
};

export default Contact;
