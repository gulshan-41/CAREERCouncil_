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
    // Added to store introduction for CategoryDetails, avoiding duplicate fetch
    const [categoryDetailsData, setCategoryDetailsData] = useState({}); // Store { catID: { introduction } }
    // Added loading and error states for fetch status
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
    // Updated to fetch full JSON, storing relatedCourses and introduction
    useEffect(() => {
        const fetchCategoryData = async () => {
            if (!activeCategory || categoryDetailsData[activeCategory]) {
                return; // Skip if already fetched
            }
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`/data/categoriesData/${activeCategory}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data for ${activeCategory}`);
                }
                const data = await response.json();
                setRelatedCourses(data.relatedCourses || []);
                setCategoryDetailsData((prev) => ({
                    ...prev,
                    [activeCategory]: {
                        introduction: data.introduction || [],
                    },
                }));
            } catch (err) {
                console.error("Error fetching subcategories:", err);
                setRelatedCourses([]);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryData();
    }, [activeCategory]);

    const toggleCategory = (catID) => {
        const isAlreadyToggled = toggledCategories.includes(catID);
        if (isAlreadyToggled) {
            // Scroll to the already toggled category
            const categoryRef = categoryRefs.current[catID];
            if (categoryRef) {
                categoryRef.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // Add new category without scrolling
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

    // Updated context to include categoryDetailsData, loading, error
    const contextValue = {
        activeCategory,
        setActiveCategory,
        relatedCourses,
        categoryDetailsData,
        toggledCategories,
        toggleCategory,
        closeCategory,
        loading,
        error,
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
                                The Categories section simplifies the navigation by organizing diverse range of courses into broader fields like Engineering, Medical, Law, Aviation, Civil Services, and Armed Forces, etc. Displayed conveniently in this column, these categories allow you to quickly explore areas of interest, discover relevant courses, and find the perfect path to achieve your career goals with ease.
                            </p>
                        </section>
                        {/* Added error UI above CategoryDetails */}
                        {error && <div className="error-section">Error: {error}</div>}
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