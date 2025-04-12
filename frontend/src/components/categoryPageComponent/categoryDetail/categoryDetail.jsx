import "./categoryDetail.scss";
import React, { useState, useEffect, forwardRef } from "react";
import { useCategoriesContext } from "/src/pages/mainPages/categoriesPage/categoriesPage"; // Adjust path

const CategoryDetails = forwardRef(({ catID }, ref) => {
    const { closeCategory } = useCategoriesContext();
    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`/data/categoriesData/${catID}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data for ${catID}`);
                }
                const data = await response.json();
                setCategoryData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (catID) {
            fetchCategoryData();
        }
    }, [catID]);

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
                <div className="sub-cat-grid">
                    <div className="sub-cat-card"></div>
                    <div className="sub-cat-card"></div>
                    <div className="sub-cat-card"></div>
                    <div className="sub-cat-card"></div>
                </div>
            </div>
            <div className="sub-cat-plain">
                {/* Subcategory components can appear here if needed */}
            </div>
            <button className="cut-cat" onClick={() => closeCategory(catID)}></button>
        </section>
    );
});

export default CategoryDetails;