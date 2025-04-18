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
            <div className="cat-courses">
                <h3>Related Courses</h3>
                <div className="cat-courses-grid">
                    {relatedCourses.map((course, index) => (
                        <div key={index} className="cat-course-card">
                            <div className="compare-toggle">Compare</div>
                            <div className="course-full-name">
                                <p>{course.name}</p>
                            </div>
                            <div className="cat-course-vr-ruler"></div>
                            <div className="course-field">
                                <div className="field-box">
                                    <p>Field: </p>
                                    <p>{course.specialization}</p>
                                </div>
                                <button>&gt;</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="cut-cat" onClick={() => closeCategory(catID)}></button>
        </section>
    );
});

export default CategoryDetails;