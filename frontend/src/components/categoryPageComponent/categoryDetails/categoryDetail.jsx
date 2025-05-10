import "./categoryDetail.scss";
import React, { forwardRef } from "react";
import { useCategories } from "/src/context/CategoriesProvider/CategoriesProvider";
import RelatedCoursesCardsGrid from "../../cardsGrid/relatedCoursesCardsGrid/relatedCoursesCardsGrid";

// CategoryDetails component to display details for a specific category
const CategoryDetails = forwardRef(({ catID }, ref) => {
    // Access context for category data and closeCategory function
    const { closeCategory, categoryDetails, detailsLoading, detailsError } = useCategories();
    const categoryData = categoryDetails[catID] || { introduction: [], relatedCourses: [] };

    // Check if catID is provided
    if (!catID) {
        return null;
    }

    // Display loading state
    if (detailsLoading[catID]) {
        return (
            <div className="cat-into-hero">
                <div className="loading-section">
                    <div className="loading-line"></div>
                </div>
            </div>
        );
    }

    // Display error state
    if (detailsError[catID]) {
        return <div className="error-section">Error: ${detailsError[catID]}</div>;
    }

    // Render category details
    return (
        <section id={`category-details-${catID}`} ref={ref} className="cat-info-section">
            <div className="each-cat-intro">
                {categoryData.introduction.map((block, index) => {
                    switch (block.type) {
                        case "heading":
                            return <h2 key={index}>{block.content}</h2>;
                        case "paragraph":
                            return <p key={index}>{block.content}</p>;
                        case "list":
                            return (
                                <ul key={index}>
                                    {block.items.map((item, itemIndex) => (
                                        <li key={itemIndex}><p>{item}</p></li>
                                    ))}
                                </ul>
                            );
                        default:
                            return (
                                <p key={index} className="unsupported">
                                    [Unsupported content type: {block.type}]
                                </p>
                            );
                    }
                })}
            </div>
            <div className="cat-courses">
                <h3>Related Courses</h3>
                <RelatedCoursesCardsGrid catID={catID} />
            </div>
            <div
                className="cut-cat"
                onClick={() => {
                    closeCategory(catID);
                }}
            >
                <svg
                    id="hcat-toggle-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#8724DB"
                >
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                </svg>
            </div>
        </section>
    );
});

export default CategoryDetails;