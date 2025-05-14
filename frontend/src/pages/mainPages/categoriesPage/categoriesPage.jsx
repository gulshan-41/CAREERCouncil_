import { useEffect, useRef } from "react";
import "./categoriesPage.scss";
import CategoriesGrid from "../../../components/cardsGrid/categoriesGrid/categoriesGrid";
import CategoryDetails from "../../../components/categoryPageComponent/categoryDetails/categoryDetail";
import CompareCapsule from "../../../components/categoryPageComponent/compareCapsule/compareCapsule";
import CompareGrid from "../../../components/categoryPageComponent/comparisonGrid/comparisonGrid";
import { useCategories } from "../../../context/CategoriesProvider/CategoriesProvider";
import { useCompare } from "../../../context/CompareContext/CompareContext";

function CategoriesPage() {
    const categoryRefs = useRef({});
    const wrapperRef = useRef(null);
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

    // Position home-toggles like signup-limiter
    useEffect(() => {
        const updateTogglesPosition = () => {
            const toggles = document.getElementById("cat-limiters");
            if (!toggles || !wrapperRef.current) return;

            const viewportWidth = window.innerWidth;
            const wrapperWidth = wrapperRef.current.offsetWidth; // Actual width of .homepage-wrapper
            const right = (viewportWidth - wrapperWidth) / 2 - 51;

            if (viewportWidth >= 1024) {
                toggles.style.right = `${right}px`;
            } else {
                toggles.style.right = ""; // Reset to avoid stale values
            }
        };

        // Initial position
        updateTogglesPosition();

        // Update on resize
        window.addEventListener("resize", updateTogglesPosition);

        // Cleanup
        return () => window.removeEventListener("resize", updateTogglesPosition);
    }, []);

    return (
        <div className="categories-page cat-utility-section">
            <div className="categories-page-wrapper" ref={wrapperRef}>
                <div className="cat-limiters" id="cat-limiters">Limiters</div>
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