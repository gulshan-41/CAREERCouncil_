import "./recommendedColleges.scss";
import React from "react";
import CollegeCardsGrid from "../../cardsGrid/collegeCardsGrid/collegeCardsGrid";

function RecommendedColleges({ data }) {
    // Fallback if data is not provided
    if (!data || !data.data) {
    return (
        <section className="recommended-colleges courses-sub-section" id="recommended-colleges">
            <h2>Recommended Colleges</h2>
            <p>No colleges available.</p>
        </section>
        );
    }

    return (
        <section className="recommended-colleges courses-sub-section" id="recommended-colleges">
            <h2>Recommended Colleges</h2>
            <div className="content-box">
                <CollegeCardsGrid colleges={data.data} />
            </div>
        </section>
    );
}

export default RecommendedColleges;