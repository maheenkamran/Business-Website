import React from "react";
import "./../styles/About.css";

const About = () => {
    return (
        <div className="about-page">
            <header className="about-header">
                <h1>About Us</h1>
            </header>

            <main className="about-container">
                <section className="intro">
                    <p>
                        At <strong>Business Nexus</strong>, we believe in
                        building a space where people, ideas, and opportunities come
                        together. Our mission is to empower individuals and businesses by
                        fostering meaningful connections, driving innovation, and unlocking
                        growth.
                    </p>
                    <p>
                        We are more than just a platform—we are a community. Whether you’re
                        an aspiring professional, a growing business, or an established
                        leader, our network is designed to help you collaborate, share
                        insights, and thrive in today’s fast-changing world.
                    </p>
                </section>

                <section className="what-we-do">
                    <h2>What We Do</h2>
                    <ul>
                        <li>
                            <strong>Connect People:</strong> Bringing together professionals,
                            entrepreneurs, and innovators from diverse fields.
                        </li>
                        <li>
                            <strong>Enable Growth:</strong> Providing tools, resources, and
                            opportunities to support personal and professional development.
                        </li>
                        <li>
                            <strong>Inspire Innovation:</strong> Creating an environment that
                            encourages creative thinking and forward-looking solutions.
                        </li>
                    </ul>
                </section>

                <section className="vision">
                    <h2>Our Vision</h2>
                    <p>
                        To become a trusted hub where knowledge meets opportunity, helping
                        every member achieve success through collaboration and shared
                        growth.
                    </p>
                </section>

                <section className="values">
                    <h2>Our Values</h2>
                    <ul>
                        <li>
                            <strong>Collaboration:</strong> We grow stronger together.
                        </li>
                        <li>
                            <strong>Integrity:</strong> Trust is the foundation of every
                            connection.
                        </li>
                        <li>
                            <strong>Innovation:</strong> Embracing change to create better
                            possibilities.
                        </li>
                        <li>
                            <strong>Inclusivity:</strong> Welcoming everyone to be part of the
                            journey.
                        </li>
                    </ul>
                </section>

                <section className="join">
                    <p>
                        <em>
                            Join us as we shape a future where possibilities are endless.
                        </em>
                    </p>
                </section>
            </main>

            <footer className="about-footer">
                <p>&copy; 2025 [Your Company/Community Name]. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default About;
