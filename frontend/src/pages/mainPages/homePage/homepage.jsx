import React, { useState } from "react";
import "./homepage.scss";
import { useNavigate } from "react-router-dom";
import HcategoriesGrid from "/src/components/cardsGrid/hcategoriesGrid/hcategoriesGrid";
import TrendingCoursesCard from "../../../components/cards/trendingCoursesCard/trendingCoursesCard";
import calli from "/src/assets/icons/call.svg";
import emaili from "/src/assets/icons/mail.svg";
import whatsappi from "/src/assets/icons/whatsapp.svg";

function Homepage() {
    const navigate = useNavigate();
    // State to track visibility of each toggle-space
    const [toggleStates, setToggleStates] = useState({
        email: false,
        call: false,
        whatsapp: false,
    });

    // Function to toggle visibility of a specific toggle-space
    const handleToggle = (id) => {
        setToggleStates((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle the specific item's visibility
        }));
    };

    return (
        <div className="homepage cat-utility-section">
            <div className="homepage-wrapper">
                <div className="home-toggles">
                    <div className="toggle-wrapper">
                        <div
                            id="email"
                            className="toggle-items"
                            onClick={() => handleToggle("email")}
                        >
                            <img src={emaili} alt="email-icon" />
                        </div>
                        <div
                            className={`toggle-space ${
                                toggleStates.email ? "visible" : ""
                            }`}
                        >
                            Email
                        </div>
                    </div>
                    <div className="toggle-wrapper">
                        <div
                            id="call"
                            className="toggle-items"
                            onClick={() => handleToggle("call")}
                        >
                            <img src={calli} alt="call-icon" />
                        </div>
                        <div
                            className={`toggle-space ${
                                toggleStates.call ? "visible" : ""
                            }`}
                        >
                            Call
                        </div>
                    </div>
                    <div className="toggle-wrapper">
                        <div
                            id="whatsapp"
                            className="toggle-items"
                            onClick={() => handleToggle("whatsapp")}
                        >
                            <img src={whatsappi} alt="whatsapp-icon" />
                        </div>
                        <div
                            className={`toggle-space ${
                                toggleStates.whatsapp ? "visible" : ""
                            }`}
                        >
                            Whatsapp
                        </div>
                    </div>
                </div>
                <section className="hero-section">
                    <div className="hero-wrapper utility-container">
                        <div className="main-hero-wrapper">
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
                                <div className="tutorial-wrapper"></div>
                            </div>
                        </div>
                    </div>
                   
                </section>

                <section className="explore-cat">
                    <div className="utility-container">
                        <h2>Explore career categories</h2>
                        <div className="hero-cat-grid">
                            <HcategoriesGrid />
                        </div>
                    </div>
                </section>

                <section className="trending-courses-now">
                    <div className="utility-container">
                        <div className="trending-courses-wrapper">
                            <h2>Explore trending courses</h2>
                            <TrendingCoursesCard />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Homepage;