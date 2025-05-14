import "./recommendedCoursesGrid.scss";
import { useCategories } from "/src/context/CategoriesProvider/CategoriesProvider";
import RecommendedCoursesCards from "../../cards/recommendedCoursesCards/recommendedCoursesCards";

function RecommendedCoursesGrid({ currentCourseID }) {
    const { recommendedCourses, recommendedLoading, recommendedError } = useCategories();

    if (recommendedLoading) {
        return (
            <div className="recommended-courses-grid">
                <p>Loading recommended courses...</p>
            </div>
        );
    }

    if (recommendedError) {
        return (
            <div className="recommended-courses-grid">
                <p>Error: {recommendedError}</p>
            </div>
        );
    }

    const filteredCourses = recommendedCourses.filter((course) => course.courseID !== currentCourseID);

    if (!filteredCourses.length) {
        return (
            <div className="recommended-courses-grid">
                <p>No recommended courses available.</p>
            </div>
        );
    }

    return (
        <div className="recommended-courses-grid">
            {filteredCourses.map((course) => (
                <RecommendedCoursesCards
                    key={course.courseID || course.name}
                    courseID={course.courseID}
                    name={course.name}
                    specialization={course.specialization}
                />
            ))}
        </div>
    );
}

export default RecommendedCoursesGrid;