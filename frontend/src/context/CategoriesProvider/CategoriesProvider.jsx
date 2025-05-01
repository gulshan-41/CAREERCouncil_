import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
    // State for categories.json (list of categories)
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState(null);

    // State for categoriesData/${catID}.json (cached per catID)
    const [categoryDetails, setCategoryDetails] = useState({}); // { catID: { relatedCourses, introduction } }
    const [detailsLoading, setDetailsLoading] = useState({}); // { catID: boolean }
    const [detailsError, setDetailsError] = useState({}); // { catID: string }

    // State for courses (specific course details)
    const [courseDetails, setCourseDetails] = useState({}); // { courseId: content }
    const [courseLoading, setCourseLoading] = useState(false);
    const [courseError, setCourseError] = useState({}); // { courseId: error }

    // Fetch categories.json once on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8800/api/categories/getcategorieslist", {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).then((data) => data.json());

            if (!response.success) {
                throw new Error("Failed to fetch categories");
            }
        
            // console.log('categoriesList = ', response.categoriesList);

            setCategories(response.categoriesList);
            setCategoriesLoading(false);
            } catch (err) {
                  setCategoriesError(err.message);
                  setCategoriesLoading(false);
                }
            };
            fetchCategories();
    }, []);

    // Function to fetch category details (cached)
    const fetchCategoryDetails = useCallback(async (catID) => {
        if (categoryDetails[catID]) {
            return; // Already cached, skip fetch
        }

        setDetailsLoading((prev) => ({ ...prev, [catID]: true }));
        setDetailsError((prev) => ({ ...prev, [catID]: null }));

        try {
            const response = await fetch(`/data/categoriesData/${catID}.json`);
            if (!response.ok) {
                throw new Error(`Failed to fetch data for ${catID}`);
            }
            const data = await response.json();

            // console.log("CategoriesData = ", catID, data);

            setCategoryDetails((prev) => ({
                ...prev,
                [catID]: {
                    relatedCourses: data.relatedCourses || [],
                    introduction: data.introduction || [],
                },
            }));
        } catch (err) {
            setDetailsError((prev) => ({ ...prev, [catID]: err.message }));
        } finally {
            setDetailsLoading((prev) => ({ ...prev, [catID]: false }));
        }
    }, [categoryDetails]);

    // Fetch course details by courseId (courses)
    const fetchCourseDetails = async (courseId) => {
        if (courseDetails[courseId]) return; // Skip if already fetched
            setCourseLoading(true);
        try {
            const response = await fetch(`/data/courses/${courseId}.json`);
            if (!response.ok) {
                throw new Error(`Failed to fetch course ${courseId}`);
            }
            const data = await response.json();
        
            setCourseDetails((prev) => ({ ...prev, [courseId]: data }));
            setCourseError((prev) => ({ ...prev, [courseId]: null }));
        } catch (error) {
            setCourseError((prev) => ({ ...prev, [courseId]: error.message }));
        } finally {
            setCourseLoading(false);
        }
    };

    const contextValue = {
        categories,
        categoriesLoading,
        categoriesError,
        categoryDetails,
        detailsLoading,
        detailsError,
        fetchCategoryDetails,
        courseDetails, // { courseId: { introduction, about, subjects } }
        courseLoading,
        courseError,
        fetchCourseDetails, // Function to fetch course by courseId
    };

    return (
        <CategoriesContext.Provider value={contextValue}>
            {children}
        </CategoriesContext.Provider>
    );
}

export function useCategories() {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error("useCategories must be used within a CategoriesProvider");
    }

    return context;
}