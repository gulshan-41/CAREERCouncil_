import "./trendingCoursesGrid.scss";
import { useCategories } from "../context/CategoriesProvider/CategoriesProvider"

function TrendingCoursesGrid() {
    const { trendingCourses, trendingLoading, trendingError } = useCategories();

    return (
        <div className="trending-courses-grid">
            
        </div>
    );
}

export default TrendingCoursesGrid;