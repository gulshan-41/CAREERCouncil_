import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

// Creating context for categories data
const CategoriesContext = createContext();

// CategoriesProvider component to manage and provide category-related state and functions
export function CategoriesProvider({ children }) {
    // State for categories list and its loading/error status
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState(null);

    // State for category details and their loading/error status
    const [categoryDetails, setCategoryDetails] = useState({});
    const [detailsLoading, setDetailsLoading] = useState({});
    const [detailsError, setDetailsError] = useState({});

    // State for course details and their loading/error status
    const [courseDetails, setCourseDetails] = useState({});
    const [courseLoading, setCourseLoading] = useState({});
    const [courseError, setCourseError] = useState({});

    // State for trending courses and their loading/error status
    const [trendingCourses, setTrendingCourses] = useState([]);
    const [trendingLoading, setTrendingLoading] = useState(true);
    const [trendingError, setTrendingError] = useState(null);

    // State for toggled categories and open dropdowns
    const [toggledCategories, setToggledCategories] = useState([]);
    const [openDropdowns, setOpenDropdowns] = useState([]);

    // Ref to track fetch promises and prevent duplicate category fetches
    const fetchPromises = useRef({});
    const hasFetchedCategories = useRef(false);

    // Effect to fetch categories list on component mount
    useEffect(() => {
        if (hasFetchedCategories.current) return;

        const fetchCategories = async () => {
            hasFetchedCategories.current = true;
            try {
                const response = await fetch("http://localhost:8800/api/categories/getcategorieslist", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((data) => data.json());

                if (!response.success) {
                    throw new Error("Failed to fetch categories");
                }

                setCategories(response.categoriesList);
                setCategoriesLoading(false);
            } catch (err) {
                setCategoriesError(err.message);
                setCategoriesLoading(false);
            }
        };
        fetchCategories();

        // Cleanup fetch promises on unmount
        return () => {
            fetchPromises.current = {};
        };
    }, []);

    // Callback to fetch category details by catID
    const fetchCategoryDetails = useCallback(async (catID) => {
        if (categoryDetails[catID]) {
            return;
        }

        if (fetchPromises.current[catID]) {
            return fetchPromises.current[catID];
        }

        setDetailsLoading((prev) => ({ ...prev, [catID]: true }));
        setDetailsError((prev) => ({ ...prev, [catID]: null }));

        const promise = fetch(`http://localhost:8800/api/categories/getcategoriesdata/${catID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (!response.success) {
                    throw new Error(`Failed to fetch data for ${catID}`);
                }

                const data = response.getCategoriesData;

                setCategoryDetails((prev) => ({
                    ...prev,
                    [catID]: {
                        relatedCourses: data.relatedCourses || [],
                        introduction: data.introduction || [],
                    },
                }));
                return data;
            })
            .catch((err) => {
                setDetailsError((prev) => ({ ...prev, [catID]: err.message }));
                throw err;
            })
            .finally(() => {
                setDetailsLoading((prev) => ({ ...prev, [catID]: false }));
                delete fetchPromises.current[catID];
            });

        fetchPromises.current[catID] = promise;
        return promise;
    }, [categoryDetails]);

    // Function to fetch course details by courseID
    const fetchCourseDetails = async (courseID) => {
        if (courseDetails[courseID]) {
            return;
        }

        if (fetchPromises.current[courseID]) {
            return fetchPromises.current[courseID];
        }

        setCourseLoading((prev) => ({ ...prev, [courseID]: true }));
        setCourseError((prev) => ({ ...prev, [courseID]: null }));

        const promise = fetch(`http://localhost:8800/api/course/getcourse/${courseID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (!response.success) {
                    throw new Error(`Failed to fetch course ${courseID}: ${response.message || 'Unknown error'}`);
                }

                const data = response.getCourseData;
                setCourseDetails((prev) => ({ ...prev, [courseID]: data }));
                setCourseError((prev) => ({ ...prev, [courseID]: null }));
                return data;
            })
            .catch((error) => {
                setCourseError((prev) => ({ ...prev, [courseID]: error.message }));
                throw error;
            })
            .finally(() => {
                setCourseLoading((prev) => ({ ...prev, [courseID]: false }));
                delete fetchPromises.current[courseID];
            });

        fetchPromises.current[courseID] = promise;
        return promise;
    };

    // Function to toggle a category (add to toggledCategories and openDropdowns)
    const toggleCategory = (catID) => {
        setToggledCategories((prev) => {
            if (prev.includes(catID)) {
                return prev;
            }
            const newToggled = [...prev, catID];
            fetchCategoryDetails(catID);
            return newToggled;
        });

        setOpenDropdowns((prev) => {
            if (prev.includes(catID)) {
                return prev;
            }
            const newOpen = [...prev, catID];
            return newOpen;
        });
    };

    // Function to close a category (remove from toggledCategories and openDropdowns)
    const closeCategory = (catID) => {
        setToggledCategories((prev) => {
            const newToggled = prev.filter((id) => id !== catID);
            return newToggled;
        });
        setOpenDropdowns((prev) => {
            const newOpen = prev.filter((id) => id !== catID);
            return newOpen;
        });
    };

    // Function to toggle dropdown state for a category
    const toggleDropdown = (catID) => {
        setOpenDropdowns((prev) => {
            const newOpen = prev.includes(catID)
                ? prev.filter((id) => id !== catID)
                : [...prev, catID];
            return newOpen;
        });
    };

    // Effect to fetch trending courses based on specific categories
    useEffect(() => {
        const fetchTrendingCourses = async () => {
            if (categoriesLoading || categoriesError) {
                setTrendingLoading(false);
                if (categoriesError) {
                    setTrendingError("Cannot fetch trending courses due to categories error");
                }
                return;
            }

            try {
                const allowedCategories = ["Engineering", "Medical", "Management"];
                const filteredCategories = categories.filter((category) =>
                    allowedCategories.includes(category.catID)
                );

                const trendingCourses = [];
                for (const category of filteredCategories) {
                    await fetchCategoryDetails(category.catID);

                    if (categoryDetails[category.catID] && !detailsError[category.catID]) {
                        const data = categoryDetails[category.catID];
                        const trending = data.relatedCourses
                            .filter((course) => course.isTrending === "true")
                            .map((course) => ({
                                trendID: course.trendID,
                                courseID: course["CO-ID"],
                                name: course.name,
                                specialization: course.specialization,
                                description: course.description,
                                categoryId: category.catID,
                            }));
                        trendingCourses.push(...trending);
                    }
                }

                if (trendingCourses.length === 0) {
                    // No trending courses found
                }

                setTrendingCourses(trendingCourses);
                setTrendingError(null);
            } catch (err) {
                setTrendingError(err.message);
            } finally {
                setTrendingLoading(false);
            }
        };
        fetchTrendingCourses();
    }, [categories, categoriesLoading, categoriesError, fetchCategoryDetails, categoryDetails, detailsError]);

    // Context value containing all state and functions
    const contextValue = {
        categories,
        categoriesLoading,
        categoriesError,
        categoryDetails,
        detailsLoading,
        detailsError,
        fetchCategoryDetails,
        courseDetails,
        courseLoading,
        courseError,
        fetchCourseDetails,
        trendingCourses,
        trendingLoading,
        trendingError,
        toggledCategories,
        openDropdowns,
        toggleCategory,
        closeCategory,
        toggleDropdown,
    };

    // Provide context to children components
    return (
        <CategoriesContext.Provider value={contextValue}>
            {children}
        </CategoriesContext.Provider>
    );
}

// Hook to access CategoriesContext
export function useCategories() {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error("useCategories must be used within a CategoriesProvider");
    }
    return context;
}