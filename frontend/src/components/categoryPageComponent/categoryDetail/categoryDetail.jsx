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
                                    <div className="course-navi">
                                        <svg
                                            id="angle-right"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            height="24px"
                                            width="24px"
                                            fill="#fff"
                                        >
                                                <path d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
            <button className="cut-cat" onClick={() => closeCategory(catID)}>
                {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xml:space="preserve"
                    height="20px"
                    width="20px"
                    fill="#000"
                    stroke="#000"
                    stroke-width="5"
                    viewBox="0 0 101 101"
                    id="cross"
                >
                        <path d="M83.9 17.1c-.9-.9-2.5-.9-3.4 0l-30 30-30-30c-.9-.9-2.5-.9-3.4 0s-.9 2.5 0 3.4l30 30-30 30c-.9.9-.9 2.5 0 3.4.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7l30-30 30 30c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4l-30-30 30-30c.9-.9.9-2.4 0-3.4z"></path>
                </svg> */}
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    viewBox="0 0 101 101"
                    id="Cross"
                    width="21px"
                    height="21px"
                    fill="#8724DB"
                    stroke="#8724DB"
                    strokeWidth="8"
                >
                        <path d="M83.9 17.1c-.9-.9-2.5-.9-3.4 0l-30 30-30-30c-.9-.9-2.5-.9-3.4 0s-.9 2.5 0 3.4l30 30-30 30c-.9.9-.9 2.5 0 3.4.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7l30-30 30 30c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4l-30-30 30-30c.9-.9.9-2.4 0-3.4z"  class="color000000 svgShape"></path>
                </svg>
            </button>
        </section>
    );
});

export default CategoryDetails;