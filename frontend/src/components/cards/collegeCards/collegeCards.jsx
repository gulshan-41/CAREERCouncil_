import "./collegeCards.scss";
import React from "react";

function CollegeCard({ name, location, ownership, ranking, totalCharges, visitLink }) {
    // Combine city, state, and country for display
    const fullLocation = `${location.city}`; // ${location.state}, ${location.country}

    return (
        <div className="college-card-wrapper">
            <div className="college-full-name">
                <h4>{name}</h4>
            </div>
            <div className="location-ownership-ranking">
                <span>{fullLocation}</span>
                <span>{ownership}</span>
                <span><em>#NIRF:</em> {ranking}</span>
            </div>
            <div className="visit-btn-wrapper">
                <a
                    href={visitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="visit-link"
                    aria-label={`Visit ${name} website`}
                >
                    <span>visit link</span>
                </a>
            </div>
        </div>
    );
}

export default CollegeCard;