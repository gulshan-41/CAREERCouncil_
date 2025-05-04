import "./collegeCardsGrid.scss";
import React from "react";
import CollegeCard from "../../cards/collegeCards/collegeCards";

function CollegeCardsGrid({ colleges }) {
    // Handle empty state
    if (!colleges || colleges.length === 0) {
        return (
            <div className="college-cards-grid">
                <p>No colleges match the selected filters.</p>
            </div>
        );
    }

    return (
        <div className="college-cards-grid">
            {colleges.map((college) => (
                <CollegeCard
                    key={college.id}
                    id={college.id}
                    name={college.name}
                    location={college.location}
                    ownership={college.ownership}
                    ranking={college.Ranking}
                    totalCharges={college["total charges"]}
                    visitLink={college["visit link"]}
                />
            ))}
        </div>
    );
}

export default CollegeCardsGrid;