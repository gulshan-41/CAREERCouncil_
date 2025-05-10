import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useCategories } from '/src/context/CategoriesProvider/CategoriesProvider';

// Creating context for managing compare toggle visibility and selected courses
const CompareContext = createContext();

// Provider component to wrap around the app or sections using RelatedCoursesCardsGrid
export function CompareProvider({ children }) {
    const [isCompareMode, setIsCompareMode] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [comparisonData, setComparisonData] = useState({});
    const { courseDetails, courseLoading, courseError, fetchCourseDetails } = useCategories();

    // Reset compare state
    const resetCompareState = () => {
        setIsCompareMode(false);
        setSelectedCourses([]);
        setComparisonData({});
    };

    // Enter compare mode
    const toggleCompareMode = () => {
        if (!isCompareMode) {
            setIsCompareMode(true);
        }
    };

    // Exit compare mode and clear selections
    const exitCompareMode = () => {
        resetCompareState();
    };

    // Add or remove a course from the selected courses list
    const toggleCourseSelection = (courseID, courseData) => {
        setSelectedCourses((prev) => {
            if (prev.some((course) => course.courseID === courseID)) {
                const newCourses = prev.filter((course) => course.courseID !== courseID);
                if (newCourses.length === 0) {
                    // console.log('No courses selected, resetting compare state');
                    resetCompareState();
                }
                return newCourses;
            }
            if (prev.length >= 2) {
                // console.log(`Cannot select more than 2 courses: ${courseID}`);
                return prev; // Limit to 2 courses
            }
            return [...prev, { courseID, ...courseData }];
        });
    };

    // Update comparison data when selectedCourses or courseDetails changes
    useEffect(() => {
        const updateComparisonData = async () => {
            const newComparisonData = {};
            for (const course of selectedCourses) {
                const courseID = course.courseID;

                // Fetch course details if not already cached
                if (!courseDetails[courseID] && !courseError[courseID]) {
                    await fetchCourseDetails(courseID);
                }

                // Check for errors or loading state
                if (courseError[courseID]) {
                    newComparisonData[courseID] = [];
                    continue;
                }

                if (!courseDetails[courseID]) {
                    newComparisonData[courseID] = [];
                    continue;
                }

                // Extract diff-point items from introduction, prerequisites, subjects, and jobRoles
                try {
                    const data = courseDetails[courseID];
                    const diffPoints = [
                        ...(data.introduction?.[0]?.text || []),
                        ...(data.prerequisites?.[0]?.text || []),
                        ...(data.subjects?.[0]?.text || []),
                        ...(data.jobRoles?.[0]?.text || []),
                    ]
                        .filter((item) => item?.key === 'diff-point')
                        .map((item) => ({
                            value: item.content,
                        }));

                    newComparisonData[courseID] = diffPoints;
                } catch (error) {
                    // console.error(`Error processing data for course ${courseID}:`, error.message);
                    newComparisonData[courseID] = [];
                }
            }
            setComparisonData(newComparisonData);
        };

        if (selectedCourses.length > 0) {
            updateComparisonData();
        } else {
            setComparisonData({});
        }
    }, [selectedCourses, courseDetails, courseError, fetchCourseDetails]);

    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        isCompareMode,
        toggleCompareMode,
        exitCompareMode,
        selectedCourses,
        toggleCourseSelection,
        comparisonData,
        courseLoading,
        courseError,
    }), [
        isCompareMode,
        toggleCompareMode,
        exitCompareMode,
        selectedCourses,
        toggleCourseSelection,
        comparisonData,
        courseLoading,
        courseError,
    ]);

    return (
        <CompareContext.Provider value={contextValue}>
            {children}
        </CompareContext.Provider>
    );
}

// Custom hook to use the CompareContext
export const useCompare = () => useContext(CompareContext);