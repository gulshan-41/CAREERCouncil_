// src/context/CategoriesProvider/CategoriesProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context
const CategoriesContext = createContext();

// CategoriesProvider Component
export function CategoriesProvider({ children }) {
    // State for categoriesList (from categoriesList collection)
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [categoriesError, setCategoriesError] = useState(null);

    // State for categoriesData (specific category details)
    const [categoryDetails, setCategoryDetails] = useState({}); // { catID: content }
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [detailsError, setDetailsError] = useState({}); // { catID: error }

    // State for courses (specific course details)
    const [courseDetails, setCourseDetails] = useState({}); // { courseId: content }
    const [courseLoading, setCourseLoading] = useState(false);
    const [courseError, setCourseError] = useState({}); // { courseId: error }

    // State for trending courses
    const [trendingCourses, setTrendingCourses] = useState([]);
    const [trendingLoading, setTrendingLoading] = useState(false);
    const [trendingError, setTrendingError] = useState(null);

    // Fetch all categories (categoriesList)
    useEffect(() => {
        const fetchCategories = async () => {
            setCategoriesLoading(true);
            try {
                const response = await fetch("/api/categories");
                if (!response.ok) throw new Error("Failed to fetch categories");
                const data = await response.json();
                setCategories(data);
                setCategoriesError(null);
            } catch (error) {
                setCategoriesError(error.message);
            } finally {
                setCategoriesLoading(false);
            }
        };
        fetchCategories();
    }, []);

    // Fetch category details by catID (categoriesData)
    const fetchCategoryDetails = async (catID) => {
        if (categoryDetails[catID]) return; // Skip if already fetched
        setDetailsLoading(true);
        try {
            const response = await fetch(`/api/categories/${catID}`);
            if (!response.ok) throw new Error(`Failed to fetch category ${catID}`);
            const data = await response.json();
            console.log(data);
            
            setCategoryDetails((prev) => ({ ...prev, [catID]: data }));
            setDetailsError((prev) => ({ ...prev, [catID]: null }));
        } catch (error) {
            setDetailsError((prev) => ({ ...prev, [catID]: error.message }));
        } finally {
            setDetailsLoading(false);
        }
    };

    // Fetch course details by courseId (courses)
    const fetchCourseDetails = async (courseId) => {
        if (courseDetails[courseId]) return; // Skip if already fetched
        setCourseLoading(true);
        try {
            const response = await fetch(`/api/courses/${courseId}`);
            if (!response.ok) throw new Error(`Failed to fetch course ${courseId}`);
            const data = await response.json();
            setCourseDetails((prev) => ({ ...prev, [courseId]: data }));
            setCourseError((prev) => ({ ...prev, [courseId]: null }));
        } catch (error) {
            setCourseError((prev) => ({ ...prev, [courseId]: error.message }));
        } finally {
            setCourseLoading(false);
        }
    };

    // Fetch trending courses (courses with isTrending: true)
    useEffect(() => {
        const fetchTrendingCourses = async () => {
            setTrendingLoading(true);
            try {
                const response = await fetch("/api/courses/trending");
                if (!response.ok) throw new Error("Failed to fetch trending courses");
                const data = await response.json();
                setTrendingCourses(data);
                setTrendingError(null);
            } catch (error) {
                setTrendingError(error.message);
            } finally {
                setTrendingLoading(false);
            }
        };
        fetchTrendingCourses();
    }, []);

    // Context value
    const value = {
        categories, // Array of { catID, text, description }
        categoriesLoading,
        categoriesError,
        categoryDetails, // { catID: { introduction, relatedCourses } }
        detailsLoading,
        detailsError,
        fetchCategoryDetails, // Function to fetch category by catID
        courseDetails, // { courseId: { introduction, about, subjects } }
        courseLoading,
        courseError,
        fetchCourseDetails, // Function to fetch course by courseId
        trendingCourses, // Array of trending course content
        trendingLoading,
        trendingError,
    };

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
}

// Custom hook to use the context
export const useCategories = () => {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error("useCategories must be used within a CategoriesProvider");
    }
    return context;
};