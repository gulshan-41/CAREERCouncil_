import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState(null);

    const [categoryDetails, setCategoryDetails] = useState({});
    const [detailsLoading, setDetailsLoading] = useState({});
    const [detailsError, setDetailsError] = useState({});

    const [courseDetails, setCourseDetails] = useState({});
    const [courseLoading, setCourseLoading] = useState(false);
    const [courseError, setCourseError] = useState({});

    const [trendingCourses, setTrendingCourses] = useState([]);
    const [trendingLoading, setTrendingLoading] = useState(true);
    const [trendingError, setTrendingError] = useState(null);

    const fetchPromises = useRef({});
    const hasFetchedCategories = useRef(false);

    useEffect(() => {
        if (hasFetchedCategories.current) return;

        const fetchCategories = async () => {
            hasFetchedCategories.current = true;
            console.log('Fetching categories list');
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

        return () => {
            fetchPromises.current = {};
        };
    }, []);

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

    const fetchCourseDetails = async (courseID) => {
        if (courseDetails[courseID]) return;
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
                                courseId: course["CO-ID"],
                                name: course.name,
                                specialization: course.specialization,
                                categoryId: category.catID,
                            }));
                        trendingCourses.push(...trending);
                    }
                }

                if (trendingCourses.length === 0) {
                    console.warn("No trending courses found.");
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
    }, [categories, categoriesLoading, categoriesError, fetchCategoryDetails, categoryDetails, detailsError]);

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