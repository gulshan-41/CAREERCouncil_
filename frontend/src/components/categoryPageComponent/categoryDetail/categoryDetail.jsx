import "./categoryDetail.scss";
import React, { forwardRef } from "react";
import { useCategoriesContext } from "/src/pages/mainPages/categoriesPage/categoriesPage";

const CategoryDetails = forwardRef(({ catID }, ref) => {
    const { closeCategory, relatedCourses, categoryDetailsData, loading, error } = useCategoriesContext();
    // Use fallback for initial render before fetch
    const categoryData = categoryDetailsData[catID] || { introduction: [] };

    if (!catID) {
        return null;
    }

    if (loading) {
        return (
            <div className="loading-section cat-utility-section">
                <div className="loading-line"></div>
            </div>
        );
    }

    if (error) {
        return <div className="error-section">Error: {error}</div>;
    }

    return (
        <section ref={ref} className="cat-info-section">
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
            <div className="cat-related-courses">
                <h2>Related Courses</h2>
                <div className="sub-cat-grid">
                    {relatedCourses.map((course, index) => (
                        <div key={index} className="sub-cat-card">
                            <h3 className="sub-cat-card__title">{course.name}</h3>
                            <p className="sub-cat-card__specialization">{course.specialization}</p>
                            <button
                                className="sub-cat-card__button"
                                onClick={() => console.log(`View course: ${course.name}`)}
                            >
                                View Course
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <button className="cut-cat" onClick={() => closeCategory(catID)}></button>
        </section>
    );
});

export default CategoryDetails;