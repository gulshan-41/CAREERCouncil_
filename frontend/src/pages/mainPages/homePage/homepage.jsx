import React from "react";
import "./homepage.scss";
import { useNavigate } from "react-router-dom";

function Homepage() {
    const navigate = useNavigate();

    return (
        <>
            <section className="hero-section utility-section">
                <div className="utility-container">
                    <div className="intro-wrapper">
                        <h1>FIND YOUR PATH, THRIVE WITH CAREER Council_</h1>
                        <p>
                            Explore courses that match your interests, best suited based on your strength points, compare options, and get AI-powered recommendations to build the career of your dreams. Let's get started!
                        </p>
                        <button className="to-courses" onClick={() => navigate("/categories")}>
                            Explore
                        </button>
                    </div>
                    <div className="tutorial-container">
                        <div className="tutorial-wrapper">
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Homepage;

// /courses/ML-AI