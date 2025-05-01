import "./relatedCoursesCardsGrid.scss";
import { useCategories } from "/src/context/CategoriesProvider/CategoriesProvider";
import RelatedCoursesCard from "../../cards/relatedCoursesCard/relatedCoursesCard";

function RelatedCoursesCardsGrid({ catID }) {
    const { categoryDetails, detailsLoading, detailsError } = useCategories();

    // No need to call fetchCategoryDetails here, as CategoriesPage already fetches it

    // Handle loading state
    if (detailsLoading[catID]) {
        return (
            <div className="cat-courses-grid">
                <p>Loading related courses...</p>
            </div>
        );
    }

    // Handle error state
    if (detailsError[catID]) {
        return (
            <div className="cat-courses-grid">
                <p>Error: {detailsError[catID]}</p>
            </div>
        );
    }

    // Get related courses from context
    const relatedCourses = categoryDetails[catID]?.relatedCourses || [];

    // Handle empty state
    if (!relatedCourses.length) {
        return (
            <div className="cat-courses-grid">
                <p>No related courses available.</p>
            </div>
        );
    }

    return (
        <div className="cat-courses-grid">
            {relatedCourses.map((course) => (
                <RelatedCoursesCard
                    key={course["CO-ID"] || course.name} // Use CO-ID or name as fallback
                    courseId={course["CO-ID"]}
                    name={course.name}
                    specialization={course.specialization}
                />
            ))}
        </div>
    );
}

export default RelatedCoursesCardsGrid;