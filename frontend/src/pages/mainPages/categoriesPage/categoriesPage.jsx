import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import "./categoriesPage.scss";
import CategoriesGrid from "../../../components/cardsGrid/categoriesGrid/categoriesGrid";
import CategoryDetails from "../../../components/categoryPageComponent/categoryDetail/categoryDetail";
import { useCategories } from "../../../context/CategoriesProvider/CategoriesProvider";

function CategoriesPage() {
    const [toggledCategories, setToggledCategories] = useState([]);
    const [openDropdowns, setOpenDropdowns] = useState([]); // Track open dropdowns
    const categoryRefs = useRef({});
    const { catID } = useParams();
    const { categoryDetails, detailsLoading, detailsError, fetchCategoryDetails } = useCategories();

    // Initialize state from URL param
    useEffect(() => {
        if (catID && !toggledCategories.includes(catID)) {
            setToggledCategories([catID]);
            setOpenDropdowns([catID]); // Open dropdown for URL param
            fetchCategoryDetails(catID); // Fetch details for URL param
        }
    }, [catID]);

    // Fetch category details for all open dropdowns
    useEffect(() => {
        openDropdowns.forEach((catID) => {
            fetchCategoryDetails(catID);
        });
    }, [openDropdowns, fetchCategoryDetails]);

    // Scroll to the latest toggled category
    useEffect(() => {
        const latestCatID = toggledCategories[toggledCategories.length - 1];
        if (latestCatID && categoryRefs.current[latestCatID]) {
            categoryRefs.current[latestCatID].scrollIntoView({ behavior: "smooth" });
        }
    }, [toggledCategories]);

    const toggleCategory = (catID) => {
        const isAlreadyToggled = toggledCategories.includes(catID);
        if (isAlreadyToggled) {
            const categoryRef = categoryRefs.current[catID];
            if (categoryRef) {
                categoryRef.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            setToggledCategories((prev) => [...prev, catID]);
            setOpenDropdowns((prev) => [...prev, catID]); // Open dropdown for new category
        }
    };

    const closeCategory = (catID) => {
        setToggledCategories((prev) => prev.filter((id) => id !== catID));
        setOpenDropdowns((prev) => prev.filter((id) => id !== catID)); // Close dropdown
    };

    const toggleDropdown = (catID) => {
        setOpenDropdowns((prev) =>
            prev.includes(catID)
                ? prev.filter((id) => id !== catID) // Close dropdown
                : [...prev, catID] // Open dropdown
        );
    };

    const contextValue = {
        openDropdowns,
        toggledCategories,
        toggleCategory,
        closeCategory,
        toggleDropdown,
    };

    return (
        <CategoriesContext.Provider value={contextValue}>
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
                                        Error: {detailsError[catID]}
                                    </div>
                                )
                        )}
                        {toggledCategories.map((catID) => (
                            <CategoryDetails
                                key={catID}
                                catID={catID}
                                ref={(el) => (categoryRefs.current[catID] = el)}
                            />
                        ))}
                    </section>
                </div>
            </div>
        </CategoriesContext.Provider>
    );
}

export default CategoriesPage;

export const CategoriesContext = React.createContext();
export const useCategoriesContext = () => useContext(CategoriesContext);