import "./recommendedCoursesGrid.scss";
import { useCategories } from "/src/context/CategoriesProvider/CategoriesProvider";
import RelatedCoursesCard from "../../cards/relatedCoursesCard/relatedCoursesCard";

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
            <h2>Recommended Courses</h2>
            {filteredCourses.map((course) => (
                <RelatedCoursesCard
                    key={course.courseID || course.name}
                    courseID={course.courseID}
                    name={course.name}
                    specialization={course.specialization}
                    courseData={course}
                />
            ))}
        </div>
    );
}

export default RecommendedCoursesGrid;