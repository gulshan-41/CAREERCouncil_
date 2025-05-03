import "./recommendedColleges.scss";
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import CollegeCardsGrid from "../../cardsGrid/collegeCardsGrid/collegeCardsGrid";

function RecommendedColleges({ data }) {
    const [selectedStates, setSelectedStates] = useState([]); // Hook 1
    const [selectedOwnerships, setSelectedOwnerships] = useState([]); // Hook 2

    // Fallback if data is not provided
    if (!data || !data.data) {
    return (
        <section className="recommended-colleges courses-sub-section" id="recommended-colleges">
            <h2>Recommended Colleges</h2>
            <p>No colleges available.</p>
        </section>
        );
    }

    // Extract unique states and ownerships
    const uniqueStates = [...new Set(data.data.map((college) => college.location.state))];
    const uniqueOwnerships = [...new Set(data.data.map((college) => college.ownership))];

    // Handle state filter changes
    const handleStateChange = (state) => {
        setSelectedStates((prev) =>
            prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]
        );
    };

    // Handle ownership filter changes
    const handleOwnershipChange = (ownership) => {
        setSelectedOwnerships((prev) =>
            prev.includes(ownership) ? prev.filter((o) => o !== ownership) : [...prev, ownership]
        );
    };

    // Memoized filtered colleges
    const filteredColleges = useMemo(() => { // Hook 3 (called conditionally)
        return data.data.filter((college) => {
            const stateMatch = selectedStates.length === 0 || selectedStates.includes(college.location.state);
            const ownershipMatch =
                selectedStates.length === 0 || selectedOwnerships.includes(college.ownership);

            return stateMatch && ownershipMatch;
        });
    }, [data.data, selectedStates, selectedOwnerships]);

    return (
        <section className="recommended-colleges courses-sub-section" id="recommended-colleges">
            <h2>Recommended Colleges</h2>
            <div className="content-box">
                {/* <div className="filter-panel">
                    <div className="filter-head">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 64 64"
                            id="filter">
                                <path fill="#D0D2E0" d="M52 50.666a5.333 5.333 0 1 1-10.667 0 5.333 5.333 0 0 1 10.667 0Z"></path>
                                <path fill="#2B3151" fill-rule="evenodd" d="M46.667 53.333a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333Zm0 2.667a5.333 5.333 0 1 0 0-10.667 5.333 5.333 0 0 0 0 10.667Z" clip-rule="evenodd"></path>
                                <path fill="#959AB4" fill-rule="evenodd" d="M51.832 52a5.343 5.343 0 0 0 0-2.667h2.835a1.333 1.333 0 0 1 0 2.667h-2.835Zm-10.33 0H9.332a1.333 1.333 0 0 1 0-2.667h32.168a5.342 5.342 0 0 0 0 2.667Z" clip-rule="evenodd"></path>
                                <path fill="#D0D2E0" d="M52 13.333a5.333 5.333 0 1 1-10.667 0 5.333 5.333 0 0 1 10.667 0Z"></path>
                                <path fill="#2B3151" fill-rule="evenodd" d="M46.667 16a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333Zm0 2.667a5.333 5.333 0 1 0 0-10.667 5.333 5.333 0 0 0 0 10.667Z" clip-rule="evenodd"></path>
                                <path fill="#959AB4" fill-rule="evenodd" d="M51.832 14.667a5.343 5.343 0 0 0 0-2.667h2.835a1.333 1.333 0 0 1 0 2.667h-2.835Zm-10.33 0H9.332a1.333 1.333 0 0 1 0-2.667h32.168a5.342 5.342 0 0 0 0 2.667Z" clip-rule="evenodd"></path>
                                <path fill="#D0D2E0" d="M24 32a5.333 5.333 0 1 1-10.667 0A5.333 5.333 0 0 1 24 32Z"></path>
                                <path fill="#2B3151" fill-rule="evenodd" d="M18.667 34.667a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333Zm0 2.667a5.333 5.333 0 1 0 0-10.667 5.333 5.333 0 0 0 0 10.667Z" clip-rule="evenodd"></path>
                                <path fill="#959AB4" fill-rule="evenodd" d="M23.832 33.334a5.343 5.343 0 0 0 0-2.667h30.835a1.333 1.333 0 0 1 0 2.667H23.832Zm-10.33 0H9.332a1.333 1.333 0 0 1 0-2.667h4.168a5.342 5.342 0 0 0 0 2.667Z" clip-rule="evenodd"></path>
                        </svg>
                        <h3 className="filter-heading">Filter Colleges</h3>
                    </div>
                    <div className="toggle-filter-options-grid">
                        <div className="filter-states filter-section">
                            <h4 className="filter-point">State</h4>
                            <ul className="states-list filter-points-list">
                                {uniqueStates.map((state) => (
                                    <li key={state} className="filter-item">
                                        <label htmlFor={`state-${state}`} className="filter-label">
                                            <input
                                                type="checkbox"
                                                id={`state-${state}`}
                                                checked={selectedStates.includes(state)}
                                                onChange={() => handleStateChange(state)}
                                                className="filter-checkbox"
                                                aria-label={`Filter by ${state}`}
                                            />
                                            <span>{state}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="filter-ownership filter-section">
                            <h4 className="filter-point">Ownership</h4>
                            <ul className="ownership-list filter-points-list">
                                {uniqueOwnerships.map((ownership) => (
                                    <li key={ownership} className="filter-item">
                                        <input
                                            type="checkbox"
                                            id={`ownership-${ownership}`}
                                            checked={selectedOwnerships.includes(ownership)}
                                            onChange={() => handleOwnershipChange(ownership)}
                                            className="filter-checkbox"
                                            aria-label={`Filter by ${ownership}`}
                                        />
                                        <label htmlFor={`ownership-${ownership}`} className="filter-label">
                                            {ownership}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div> */}
                <CollegeCardsGrid colleges={filteredColleges} />
            </div>
        </section>
    );
}

RecommendedColleges.propTypes = {
    data: PropTypes.shape({
        data: PropTypes.arrayOf(
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
                "visit link": PropTypes.string.isRequired,
                "total charges": PropTypes.string.isRequired,
            })
        ),
    }),
};

export default RecommendedColleges;