import "./trendingCoursesCard.scss";
import { useNavigate } from "react-router-dom";

function TrendingCoursesCard({ courseID, name, specialization }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/courses/${courseID}`);
    };

    return (
        <div className="trending-course-card-wrapper" onClick={handleNavigate}>
            <div className="compare-toggle">Compare</div>
            <div className="course-full-name">
                <p>{name}</p>
            </div>
            <div className="cat-course-vr-ruler"></div>
            <div className="course-field">
                <div className="field-box">
                    <p>Field: </p>
                    <p>{specialization}</p>
                </div>
                <div className="course-navi">
                    <svg
                        id="angle-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        height="24px"
                        width="24px"
                        fill="#fff"
                    >
                        <path d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default TrendingCoursesCard;