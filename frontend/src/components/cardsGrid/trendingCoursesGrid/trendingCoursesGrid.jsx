import "./trendingCoursesGrid.scss";
import TrendingCoursesCard from "../../cards/trendingCoursesCard/trendingCoursesCard";
import { useCategories } from "../../../context/CategoriesProvider/CategoriesProvider"

function TrendingCoursesGrid() {
    const { trendingCourses, trendingLoading, trendingError } = useCategories();

    if(trendingLoading) {
        return <div className="trending-courses-grid">Loading...</div>
    }

    if(trendingError) {
        return <div className="trending-courses-grid">Error: {trendingError}</div>
    }

    return (
        <div className="trending-courses-grid">
            {trendingCourses.map((course) => (
                <TrendingCoursesCard 
                    key={course.trendID}
                    courseID={course.courseID}
                    name={course.name}
                    specialization={course.specialization}
                />
            ))}
        </div>
    );
}

export default TrendingCoursesGrid;