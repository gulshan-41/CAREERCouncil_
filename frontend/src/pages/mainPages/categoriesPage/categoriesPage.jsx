import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import "./categoriesPage.scss";
import CategoriesGrid from "../../../components/categoriesGrid/categoriesGrid";
import CategoryDetails from "../../../components/categoryPageComponent/categoryDetail/categoryDetail";
import { useCategories } from "../../../context/CategoriesProvider/CategoriesProvider";

function CategoriesPage() {
    const [toggledCategories, setToggledCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const categoryRefs = useRef({});
    const { catID } = useParams();
    const { categoryDetails, detailsLoading, detailsError, fetchCategoryDetails } = useCategories();

    // Initialize state from URL param
    useEffect(() => {
        if (catID && !toggledCategories.includes(catID)) {
            setToggledCategories([catID]);
            setActiveCategory(catID);
        }
    }, [catID]);

    // Fetch category details when activeCategory changes
    useEffect(() => {
        if (activeCategory) {
            fetchCategoryDetails(activeCategory);
        }
    }, [activeCategory, fetchCategoryDetails]);

    const toggleCategory = (catID) => {
        const isAlreadyToggled = toggledCategories.includes(catID);
        if (isAlreadyToggled) {
            const categoryRef = categoryRefs.current[catID];
            if (categoryRef) {
                categoryRef.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            setToggledCategories((prev) => [...prev, catID]);
        }
            setActiveCategory(catID);
    };

    const closeCategory = (catID) => {
        setToggledCategories((prev) => prev.filter((id) => id !== catID));
        if (activeCategory === catID) {
            setActiveCategory(null);
        }
    };

    const contextValue = {
        activeCategory,
        setActiveCategory,
        toggledCategories,
        toggleCategory,
        closeCategory,
    };

  return (
        <CategoriesContext.Provider value={contextValue}>
            <div className="categories-page cat-utility-section">
                <div className="categories-page-wrapper">
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
                        {detailsError[activeCategory] && (
                            <div className="error-section">Error: {detailsError[activeCategory]}</div>
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

// Keep existing context for CategoriesPage-specific state
export const CategoriesContext = React.createContext();
export const useCategoriesContext = () => useContext(CategoriesContext);