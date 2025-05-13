import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useSurvey } from "../SurveyContext/SurveyContext";

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
    const { surveyData } = useSurvey(); // Access surveyData
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
    const [toggledCategories, setToggledCategories] = useState([]);
    const [openDropdowns, setOpenDropdowns] = useState([]);
    const [recommendedCourses, setRecommendedCourses] = useState([]); // New state
    const [recommendedLoading, setRecommendedLoading] = useState(true); // New state
    const [recommendedError, setRecommendedError] = useState(null); // New state
    const fetchPromises = useRef({});
    const hasFetchedCategories = useRef(false);

    // Fetch categories list
    useEffect(() => {
        if (hasFetchedCategories.current) return;
        const fetchCategories = async () => {
            hasFetchedCategories.current = true;
            try {
                const response = await fetch("http://localhost:8800/api/categories/getcategorieslist", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }).then((data) => data.json());
                if (!response.success) throw new Error("Failed to fetch categories");
                setCategories(response.categoriesList);
                setCategoriesLoading(false);
            } catch (err) {
                setCategoriesError(err.message);
                setCategoriesLoading(false);
            }
        };
        fetchCategories();
        return () => { fetchPromises.current = {}; };
    }, []);

    // Fetch category details
    const fetchCategoryDetails = useCallback(async (catID) => {
        if (categoryDetails[catID]) return;
        if (fetchPromises.current[catID]) return fetchPromises.current[catID];
        setDetailsLoading((prev) => ({ ...prev, [catID]: true }));
        setDetailsError((prev) => ({ ...prev, [catID]: null }));
        const promise = fetch(`http://localhost:8800/api/categories/getcategoriesdata/${catID}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((response) => {
                if (!response.success) throw new Error(`Failed to fetch data for ${catID}`);
                const data = response.getCategoriesData;
                setCategoryDetails((prev) => ({
                    ...prev,
                    [catID]: {
                        introduction: data.introduction || [],
                        relatedCourses: data.relatedCourses || [],
                        recommendedCourses: data.recommendedCourses || [],
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

    // Fetch course details
    const fetchCourseDetails = async (courseID) => {
        if (courseDetails[courseID]) return;
        if (fetchPromises.current[courseID]) return fetchPromises.current[courseID];
        setCourseLoading((prev) => ({ ...prev, [courseID]: true }));
        setCourseError((prev) => ({ ...prev, [courseID]: null }));
        const promise = fetch(`http://localhost:8800/api/course/getcourse/${courseID}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((response) => {
                if (!response.success) throw new Error(`Failed to fetch course ${courseID}: ${response.message || "Unknown error"}`);
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

    // Fetch recommended courses based on user preferences
    useEffect(() => {
        const fetchRecommendedCourses = async () => {
            if (categoriesLoading || categoriesError || !surveyData.interests.fields.length) {
                setRecommendedLoading(false);
                if (categoriesError) setRecommendedError("Cannot fetch recommended courses due to categories error");
                if (!surveyData.interests.fields.length) setRecommendedError("No user preferences selected");
                return;
            }
            try {
                setRecommendedLoading(true);
                const userFields = surveyData.interests.fields; // e.g., ["Engineering", "Medical"]
                const filteredCategories = categories.filter((category) => userFields.includes(category.catID));
                const recommended = [];
                for (const category of filteredCategories) {
                    await fetchCategoryDetails(category.catID);
                    if (categoryDetails[category.catID] && !detailsError[category.catID]) {
                        const courses = categoryDetails[category.catID].recommendedCourses.map((course) => ({
                            courseID: course["CO-ID"],
                            name: course.name,
                            description: course.description,
                            specialization: course.specialization,
                            categoryId: category.catID,
                        }));
                        recommended.push(...courses);
                    }
                }
                setRecommendedCourses(recommended);
                setRecommendedError(null);
            } catch (err) {
                setRecommendedError(err.message);
            } finally {
                setRecommendedLoading(false);
            }
        };
        fetchRecommendedCourses();
    }, [categories, categoriesLoading, categoriesError, surveyData.interests.fields, fetchCategoryDetails, categoryDetails, detailsError]);

    // Existing toggle functions (unchanged)
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

    // Existing trending courses effect (unchanged)
    useEffect(() => {
        const fetchTrendingCourses = async () => {
            if (categoriesLoading || categoriesError) {
                setTrendingLoading(false);
                if (categoriesError) setTrendingError("Cannot fetch trending courses due to categories error");
                return;
            }
            try {
                const allowedCategories = ["Engineering", "Medical", "Management"];
                const filteredCategories = categories.filter((category) => allowedCategories.includes(category.catID));
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
        recommendedCourses, // Add to context
        recommendedLoading, // Add to context
        recommendedError, // Add to context
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