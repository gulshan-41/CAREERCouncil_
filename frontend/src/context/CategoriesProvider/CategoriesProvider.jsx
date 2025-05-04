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
    const [courseDetails, setCourseDetails] = useState({}); // { courseID: content }
    const [courseLoading, setCourseLoading] = useState(false);
    const [courseError, setCourseError] = useState({}); // { courseID: error }

    // State for trending courses
    const [trendingCourses, setTrendingCourses] = useState([]);
    const [trendingLoading, setTrendingLoading] = useState(true);
    const [trendingError, setTrendingError] = useState(null);

    // Fetch categories.json once on mount
    useEffect(() => {
        const fetchCategories = async () => {
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
    }, []);

    // Function to fetch category details (cached)
    const fetchCategoryDetails = useCallback(async (catID) => {
        if (categoryDetails[catID]) {
            return; // Already cached, skip fetch
        }

        setDetailsLoading((prev) => ({ ...prev, [catID]: true }));
        setDetailsError((prev) => ({ ...prev, [catID]: null }));

        try {
            const response = await fetch(`http://localhost:8800/api/categories/getcategoriesdata/${catID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((data) => data.json());

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
        } catch (err) {
            setDetailsError((prev) => ({ ...prev, [catID]: err.message }));
        } finally {
            setDetailsLoading((prev) => ({ ...prev, [catID]: false }));
        }
    }, [categoryDetails]);

    // Fetch course details by courseID (courses)
    const fetchCourseDetails = async (courseID) => {
        if (courseDetails[courseID]) return; // Skip if already fetched
        setCourseLoading(true);
        try {
            const response = await fetch(`http://localhost:8800/api/course/getcourse/${courseID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((data) => data.json());

            if (!response.success) {
                throw new Error(`Failed to fetch course ${courseID}`);
            }

            const data = response.getCourseData;

            setCourseDetails((prev) => ({ ...prev, [courseID]: data }));
            setCourseError((prev) => ({ ...prev, [courseID]: null }));
        } catch (error) {
            setCourseError((prev) => ({ ...prev, [courseID]: error.message }));
        } finally {
            setCourseLoading(false);
        }
    };

    // Fetch trending courses on mount, using categories state
    useEffect(() => {
        const fetchTrendingCourses = async () => {
            if (categoriesLoading || categoriesError) {
                // Wait for categories to load or handle error
                setTrendingLoading(false);
                if (categoriesError) {
                    setTrendingError("Cannot fetch trending courses due to categories error");
                }
                return;
            }

            try {
                // Limit to Engineering, Medical, and Management
                const allowedCategories = ["Engineering", "Medical", "Management"];
                const filteredCategories = categories.filter((category) =>
                    allowedCategories.includes(category.catID)
                );

                const trendingCourses = [];
                for (const category of filteredCategories) {
                    try {
                        const response = await fetch(`http://localhost:8800/api/categories/getcategoriesdata/${category.catID}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }).then((data) => data.json());
                        if (!response.success) {
                            console.warn(`Failed to fetch data for ${category.catID}: ${response.status}`);
                            continue;
                        }
                        let data;
                        try {
                            data = response.getCategoriesData;
                        } catch (jsonErr) {
                            const responseText = await response.text();
                            console.error(
                                `JSON parse error for ${category.catID}: ${jsonErr.message}`,
                                `Response content: ${responseText.slice(0, 200)}...`
                            );
                            continue;
                        }
                        const trending = data.relatedCourses
                            .filter((course) => course.isTrending === "true")
                            .map((course) => ({
                                trendID: course.trendID,
                                courseId: course["CO-ID"],
                                name: course.name,
                                specialization: course.specialization,
                                categoryId: category.catID,
                            }));
                        trendingCourses.push(...trending);
                    } catch (err) {
                        console.warn(`Error fetching ${category.catID}: ${err.message}`);
                    }
                }

                trendingCourses.sort((a, b) => a.trendID.localeCompare(b.trendID));
                console.log("All Trending Courses:", trendingCourses);

                if (trendingCourses.length === 0) {
                    console.warn("No trending courses found. Check JSON files or isTrending fields.");
                }

                setTrendingCourses(trendingCourses);
                setTrendingError(null);
            } catch (err) {
                console.error("Trending courses error:", err.message);
                setTrendingError(err.message);
            } finally {
                setTrendingLoading(false);
            }
        };
        fetchTrendingCourses();
    }, [categories, categoriesLoading, categoriesError]);


    const contextValue = {
        categories,
        categoriesLoading,
        categoriesError,
        categoryDetails,
        detailsLoading,
        detailsError,
        fetchCategoryDetails,
        courseDetails, // { courseID: { introduction, about, subjects } }
        courseLoading,
        courseError,
        fetchCourseDetails, // Function to fetch course by courseID
        trendingCourses, // Array of { trendID, courseId, name, specialization, categoryId }
        trendingLoading,
        trendingError,
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