import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useSurvey } from "../SurveyContext/SurveyContext";

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
    let surveyData = { interests: { fields: [] } };
    try {
        const { surveyData: contextSurveyData } = useSurvey();
        surveyData = contextSurveyData;
    } catch (error) {
        console.warn("useSurvey failed: Ensure CategoriesProvider is wrapped in SurveyProvider", error);
    }

    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState(null);
    const [categoryDetails, setCategoryDetails] = useState({});
    const [detailsLoading, setDetailsLoading] = useState({});
    const [detailsError, setDetailsError] = useState({});
    const [courseDetails, setCourseDetails] = useState({});
    const [courseLoading, setCourseLoading] = useState({});
    const [courseError, setCourseError] = useState({});
    const [trendingCourses, setTrendingCourses] = useState([]);
    const [trendingLoading, setTrendingLoading] = useState(true);
    const [trendingError, setTrendingError] = useState(null);
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [recommendedLoading, setRecommendedLoading] = useState(true);
    const [recommendedError, setRecommendedError] = useState(null);
    const [toggledCategories, setToggledCategories] = useState([]);
    const [openDropdowns, setOpenDropdowns] = useState([]);
    const fetchPromises = useRef({});
    const hasFetchedCategories = useRef(false);

    useEffect(() => {
        if (hasFetchedCategories.current) return;
        const fetchCategories = async () => {
            hasFetchedCategories.current = true;
            try {
                const response = await fetch("http://localhost:8800/api/categories/getcategorieslist", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await response.text();
                    throw new Error(`Expected JSON, got ${contentType || "no content-type"}: ${text}`);
                }

                const data = await response.json();
                if (!data.success) {
                    throw new Error("Failed to fetch categories");
                }
                setCategories(data.categoriesList);
                setCategoriesLoading(false);
            } catch (err) {
                console.error("Fetch categories error:", err);
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
        if (categoryDetails[catID]) return;
        if (fetchPromises.current[catID]) return fetchPromises.current[catID];

        setDetailsLoading((prev) => ({ ...prev, [catID]: true }));
        setDetailsError((prev) => ({ ...prev, [catID]: null }));

        const promise = fetch(`http://localhost:8800/api/categories/getcategoriesdata/${catID}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (response) => {
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`HTTP error! Status: ${response.status}, Body: ${text}`);
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await response.text();
                    throw new Error(`Expected JSON, got ${contentType || "no content-type"}: ${text}`);
                }

                return response.json();
            })
            .then((data) => {
                if (!data.success) {
                    throw new Error(`Failed to fetch data for ${catID}`);
                }
                const result = data.getCategoriesData;
                setCategoryDetails((prev) => ({
                    ...prev,
                    [catID]: {
                        introduction: result.introduction || [],
                        relatedCourses: result.relatedCourses || [],
                        recommendedCourses: result.recommendedCourses || [],
                    },
                }));
                return result;
            })
            .catch((err) => {
                console.error(`Fetch category details error for ${catID}:`, err);
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
        if (fetchPromises.current[courseID]) return fetchPromises.current[courseID];

        setCourseLoading((prev) => ({ ...prev, [courseID]: true }));
        setCourseError((prev) => ({ ...prev, [courseID]: null }));

        const promise = fetch(`http://localhost:8800/api/course/getcourse/${courseID}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (response) => {
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`HTTP error! Status: ${response.status}, Body: ${text}`);
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await response.text();
                    throw new Error(`Expected JSON, got ${contentType || "no content-type"}: ${text}`);
                }

                return response.json();
            })
            .then((data) => {
                if (!data.success) {
                    throw new Error(`Failed to fetch course ${courseID}: ${data.message || "Unknown error"}`);
                }
                const result = data.getCourseData;
                setCourseDetails((prev) => ({ ...prev, [courseID]: result }));
                setCourseError((prev) => ({ ...prev, [courseID]: null }));
                return result;
            })
            .catch((error) => {
                console.error(`Fetch course details error for ${courseID}:`, error);
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

    const toggleCategory = (catID) => {
        setToggledCategories((prev) => {
            if (prev.includes(catID)) return prev;
            const newToggled = [...prev, catID];
            fetchCategoryDetails(catID);
            return newToggled;
        });
        setOpenDropdowns((prev) => {
            if (prev.includes(catID)) return prev;
            return [...prev, catID];
        });
    };

    const closeCategory = (catID) => {
        setToggledCategories((prev) => prev.filter((id) => id !== catID));
        setOpenDropdowns((prev) => prev.filter((id) => id !== catID));
    };

    const toggleDropdown = (catID) => {
        setOpenDropdowns((prev) => (prev.includes(catID) ? prev.filter((id) => id !== catID) : [...prev, catID]));
    };

    useEffect(() => {
        const fetchRecommendedCourses = async () => {
            // console.log("surveyData.interests.fields:", surveyData.interests.fields);
            if (categoriesLoading || categoriesError || !surveyData.interests.fields.length) {
                setRecommendedLoading(false);
                if (categoriesError) {
                    setRecommendedError("Cannot fetch recommended courses due to categories error");
                } else if (!surveyData.interests.fields.length) {
                    setRecommendedError("No user preferences selected");
                }
                return;
            }
            try {
                setRecommendedLoading(true);
                const userFields = surveyData.interests.fields;
                const filteredCategories = categories.filter((category) =>
                    userFields.includes(category.catID)
                );
                const recommended = [];

                // Fetch category details concurrently
                await Promise.all(
                    filteredCategories.map(async (category) => {
                        await fetchCategoryDetails(category.catID);
                        if (categoryDetails[category.catID] && !detailsError[category.catID]) {
                            const courses = categoryDetails[category.catID].recommendedCourses.map(
                                (course) => ({
                                    courseID: course["CO-ID"],
                                    name: course.name,
                                    description: course.description,
                                    specialization: course.specialization,
                                    categoryId: category.catID,
                                })
                            );
                            recommended.push(...courses);
                        }
                    })
                );

                // console.log("Recommended courses:", recommended);
                setRecommendedCourses(recommended);
                setRecommendedError(null);
            } catch (err) {
                console.error("Fetch recommended courses error:", err);
                setRecommendedError(err.message);
            } finally {
                setRecommendedLoading(false);
            }
        };
        fetchRecommendedCourses();
    }, [
        categories,
        categoriesLoading,
        categoriesError,
        surveyData.interests.fields,
        fetchCategoryDetails,
        categoryDetails,
        detailsError,
    ]);

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

                await Promise.all(
                    filteredCategories.map(async (category) => {
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
                    })
                );

                setTrendingCourses(trendingCourses);
                setTrendingError(null);
            } catch (err) {
                console.error("Fetch trending courses error:", err);
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
        recommendedCourses,
        recommendedLoading,
        recommendedError,
        toggledCategories,
        openDropdowns,
        toggleCategory,
        closeCategory,
        toggleDropdown,
    };

    return <CategoriesContext.Provider value={contextValue}>{children}</CategoriesContext.Provider>;
}

export function useCategories() {
    const context = useContext(CategoriesContext);
    if (!context) throw new Error("useCategories must be used within a CategoriesProvider");
    return context;
}