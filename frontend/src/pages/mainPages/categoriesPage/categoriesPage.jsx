import React, { useEffect, useRef } from "react";
import "./categoriesPage.scss";
import CategoriesGrid from "../../../components/cardsGrid/categoriesGrid/categoriesGrid";
import CategoryDetails from "../../../components/categoryPageComponent/categoryDetails/categoryDetail";
import CompareCapsule from "../../../components/categoryPageComponent/compareCapsule/compareCapsule";
import CompareGrid from "../../../components/categoryPageComponent/comparisonGrid/comparisonGrid";
import { useCategories } from "../../../context/CategoriesProvider/CategoriesProvider";
import { useCompare } from "../../../context/CompareContext/CompareContext";

function CategoriesPage() {
    const categoryRefs = useRef({});
    const { 
        categoryDetails, 
        detailsLoading, 
        detailsError, 
        toggledCategories, 
        openDropdowns 
    } = useCategories();
    const { isCompareMode } = useCompare();

    useEffect(() => {
        const latestCatID = toggledCategories[toggledCategories.length - 1];
        if (latestCatID && categoryRefs.current[latestCatID]) {
            categoryRefs.current[latestCatID].scrollIntoView({ behavior: "smooth" });
        }
    }, [toggledCategories]);

    return (
        <div className="categories-page cat-utility-section">
            <div className="categories-page-wrapper">
                <div className="cat-limiters">Limiters</div>
                <section className="categories-aside">
                    <div className="aside-categories-style">
                        <CategoriesGrid />
                    </div>
                </section>
                <section className="categories-main-section">
                    <section className="cat-into-hero">
                        <h1>Categories</h1>
                        <p>
                            The Categories section simplifies navigation by organizing a diverse range of courses into broader fields like Engineering, Medical, Law, Aviation, Civil Services, and Armed Forces, etc. Displayed conveniently in this column, these categories allow you to quickly explore areas of interest, discover relevant courses, and find the perfect path to achieve your career goals with ease.
                        </p>
                    </section>
                    {openDropdowns.map(
                        (catID) =>
                            detailsError[catID] && (
                                <div key={catID} className="error-section">
                                    Error: ${detailsError[catID]}
                                </div>
                            )
                    )}
                    {toggledCategories.map((catID, index) => (
                        <CategoryDetails
                            key={`${catID}-${index}`}
                            catID={catID}
                            ref={(el) => (categoryRefs.current[catID] = el)}
                        />
                    ))}
                </section>
                {isCompareMode && <CompareGrid />}
                <CompareCapsule />
            </div>
        </div>
    );
}

export default CategoriesPage;