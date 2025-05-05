import { createContext, useContext, useState, useEffect } from 'react';
import { useCategories } from '/src/context/CategoriesProvider/CategoriesProvider';

// Creating context for managing compare toggle visibility and selected courses
const CompareContext = createContext();

// Provider component to wrap around the app or sections using RelatedCoursesCardsGrid
export function CompareProvider({ children }) {
    const [isCompareMode, setIsCompareMode] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [comparisonData, setComparisonData] = useState({});
    const { courseDetails, courseLoading, courseError, fetchCourseDetails } = useCategories();

    // Enter compare mode
    const toggleCompareMode = () => {
        if (!isCompareMode) {
            console.log('Entering compare mode');
            setIsCompareMode(true);
        }
    };

    // Exit compare mode and clear selections
    const exitCompareMode = () => {
        console.log('Exiting compare mode');
        setIsCompareMode(false);
        setSelectedCourses([]);
        setComparisonData({});
    };

    // Add or remove a course from the selected courses list
    const toggleCourseSelection = (courseID, courseData) => {
        setSelectedCourses((prev) => {
            if (prev.some((course) => course.courseID === courseID)) {
                console.log(`Deselecting course: ${courseID}`);
                return prev.filter((course) => course.courseID !== courseID);
            }
            if (prev.length >= 2) {
                console.log(`Cannot select more than 2 courses: ${courseID}`);
                return prev; // Limit to 2 courses
            }
            console.log(`Selecting course: ${courseID}`);
            return [...prev, { courseID, ...courseData }];
        });
    };

    // Update comparison data when selectedCourses or courseDetails changes
    useEffect(() => {
        console.log('Selected courses changed:', selectedCourses);
        const updateComparisonData = async () => {
            const newComparisonData = {};
            for (const course of selectedCourses) {
                const courseID = course.courseID;

                // Fetch course details if not already cached
                if (!courseDetails[courseID] && !courseError[courseID]) {
                    console.log(`Fetching details for course: ${courseID}`);
                    await fetchCourseDetails(courseID);
                }

                // Check for errors or loading state
                if (courseError[courseID]) {
                    console.error(`Error for course ${courseID}: ${courseError[courseID]}`);
                    newComparisonData[courseID] = [];
                    continue;
                }

                if (!courseDetails[courseID]) {
                    newComparisonData[courseID] = []; // Data not yet loaded
                    continue;
                }

                // Extract diff-point items from introduction, prerequisites, and subjects
                try {
                    const data = courseDetails[courseID];
                    const diffPoints = [
                        ...(data.introduction?.text || []),
                        ...(data.prerequisites?.text || []),
                        ...(data.subjects?.text || []),
                    ]
                        .filter((item) => item.key === 'diff-point')
                        .map((item) => ({
                            point: item.content.substring(
                                0,
                                item.content.indexOf(':') !== -1
                                    ? item.content.indexOf(':')
                                    : item.content.length
                            ).trim(),
                            value: item.content,
                        }));
                    newComparisonData[courseID] = diffPoints;
                } catch (error) {
                    console.error(`Error processing data for course ${courseID}:`, error.message);
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

    return (
        <CompareContext.Provider
            value={{
                isCompareMode,
                toggleCompareMode,
                exitCompareMode,
                selectedCourses,
                toggleCourseSelection,
                comparisonData,
                courseLoading, // Added to context
                courseError,   // Added to context
            }}
        >
            {children}
        </CompareContext.Provider>
    );
}

// Custom hook to use the CompareContext
export const useCompare = () => useContext(CompareContext);