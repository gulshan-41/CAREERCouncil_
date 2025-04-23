import React from "react";
import "./homepage.scss";
import { useNavigate } from "react-router-dom";
import HcategoriesGrid from "/src/components/hcategoriesGrid/hcategoriesGrid";

function Homepage() {
    const navigate = useNavigate();

    return (
        <>
            <section className="hero-section utility-section">
                <div className="hero-wrapper utility-container">
                    <div className="intro-div">
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

            <section className="explore-cat utility-section">
                <div className="utility-container">
                    <h2>Explore career categories</h2>
                    <div className="hero-cat-grid">
                        <HcategoriesGrid />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Homepage;