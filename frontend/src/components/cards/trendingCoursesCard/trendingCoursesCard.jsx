import "./trendingCoursesCard.scss";
import { useCategories } from "../../../context/CategoriesProvider/CategoriesProvider";
import { useNavigate } from "react-router-dom";

function TrendingCoursesCard() {
    const { trendingCourses, trendingLoading, trendingError } = useCategories();
    const navigate = useNavigate();

    const handleNavigate = (courseID) => {
        if (courseID && courseID !== "null") {
            navigate(`/courses/${courseID}`);
        }
    };

    if (trendingLoading) {
        return <div className="trending-courses-grid">Loading...</div>;
    }

    if (trendingError) {
        return <div className="trending-courses-grid">Error: {trendingError}</div>;
    }

    // Slice categories into two equal arrays
    const totalCategories = trendingCourses.length;
    const midpoint = Math.floor(totalCategories / 2);
    const listone = trendingCourses.slice(0, midpoint);
    const listtwo = trendingCourses.slice(midpoint);

    const totalCardsListone = listone.length;
    const totalCardsListtwo = listtwo.length;

    return (
        <>
        <div className="trending-courses-grid1" style={{ "--total-cardsONE": totalCardsListone }}>
            {listone.map((course, index) => (
                <div
                    className="trending-course-card-wrapper"
                    key={course.courseID}
                    onClick={() => handleNavigate(course.courseID)}
                    style={{ "--position": index + 1 }}
                >
                    <div className="tcourse-name">
                        <p>{course.name}</p>
                    </div>
                    <div className="tcourse-field">
                        <div className="tfield-box">
                            <p>Field: </p>
                            <p>{course.specialization}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="trending-courses-grid2" style={{ "--total-cardsTWO": totalCardsListtwo }}>
            {listtwo.map((course, index) => (
                <div
                    className="trending-course-card-wrapper-rv"
                    key={course.courseID}
                    onClick={() => handleNavigate(course.courseID)}
                    style={{ "--position": index + 1 }}
                >
                    <div className="tcourse-name">
                        <p>{course.name}</p>
                    </div>
                    <div className="tcourse-field">
                        <div className="tfield-box">
                            <p>Field: </p>
                            <p>{course.specialization}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}

export default TrendingCoursesCard;