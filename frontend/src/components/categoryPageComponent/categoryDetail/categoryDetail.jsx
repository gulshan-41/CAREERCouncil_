import "./categoryDetail.scss";
import React, { forwardRef } from "react";
import { useCategoriesContext } from "/src/pages/mainPages/categoriesPage/categoriesPage";
import { useCategories } from "/src/context/CategoriesProvider/CategoriesProvider";

const CategoryDetails = forwardRef(({ catID }, ref) => {
    const { closeCategory } = useCategoriesContext();
    const { categoryDetails, detailsLoading, detailsError } = useCategories();
    const categoryData = categoryDetails[catID] || { introduction: [], relatedCourses: [] };

    if (!catID) {
        return null;
    }

    if (detailsLoading[catID]) {
        return (
            <div className="cat-into-hero">
                <div className="loading-section">
                    <div className="loading-line"></div>
                </div>
            </div>
        );
    }

    if (detailsError[catID]) {
        return <div className="error-section">Error: {detailsError[catID]}</div>;
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
                        {categoryData.relatedCourses.map((course, index) => (
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