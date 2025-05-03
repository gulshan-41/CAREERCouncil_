import "./collegeCardsGrid.scss";
import React from "react";
import PropTypes from "prop-types";
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

CollegeCardsGrid.propTypes = {
    colleges: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            location: PropTypes.shape({
                city: PropTypes.string.isRequired,
                state: PropTypes.string.isRequired,
                country: PropTypes.string.isRequired,
            }).isRequired,
            ownership: PropTypes.string.isRequired,
            Ranking: PropTypes.string.isRequired,
            "total charges": PropTypes.string.isRequired,
            "visit link": PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CollegeCardsGrid;