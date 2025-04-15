import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import "./categoriesPage.scss";
import CategoriesGrid from "../../../components/categoriesGrid/categoriesGrid";
import CategoryDetails from "../../../components/categoryPageComponent/categoryDetail/categoryDetail";

const CategoriesContext = createContext();

function CategoriesPage() {
    const [toggledCategories, setToggledCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [relatedCourses, setRelatedCourses] = useState([]); // Kept for CategoriesCard
    const categoryRefs = useRef({});
    const { catID } = useParams();

    // Initialize state from URL param
    useEffect(() => {
        if (catID && !toggledCategories.includes(catID)) {
            setToggledCategories([catID]);
            setActiveCategory(catID);
        }
    }, [catID]);

    // Fetch subcategories when activeCategory changes (for CategoriesCard)
    useEffect(() => {
        const fetchSubCategories = async () => {
            if (!activeCategory) {
                setRelatedCourses([]);
                return;
            }
            try {
                const response = await fetch(`/data/categoriesData/${activeCategory}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data for ${activeCategory}`);
                }
                const data = await response.json();
                setRelatedCourses(data.relatedCourses || []);
            } catch (err) {
                console.error("Error fetching subcategories:", err);
                setRelatedCourses([]);
            }
        };

        fetchSubCategories();
    }, [activeCategory]);

    // Scroll to latest CategoryDetails
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
        relatedCourses,
        toggledCategories,
        toggleCategory,
        closeCategory,
    };

    return (
        <CategoriesContext.Provider value={contextValue}>
            <div className="categories-page cat-utility-section">
                <div className="categories-page-wrapper cat-utility-container">
                    <section className="categories-aside">
                        <div className="aside-categories-style">
                            <CategoriesGrid />
                        </div>
                    </section>
                    <section className="categories-main-section">
                        <section className="cat-into-hero">
                            <h1>Categories</h1>
                            <p>
                                The Categories section simplifies the navigation by organizing diverse range of courses into broader fields like Engineering, Medical, Law, Aviation, Civil Services, and Armed Forces, etc. Displayed conveniently in this column, these categories allow you to quickly explore areas of interest, discover relevant courses, and find the perfect path to achieve your career goals with ease.
                            </p>
                        </section>
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

export const useCategoriesContext = () => useContext(CategoriesContext);