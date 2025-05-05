import "./relatedCoursesCard.scss";
import { useNavigate } from "react-router-dom";
import { useCompare } from "/src/context/CompareContext/CompareContext";

function RelatedCoursesCard({ courseID, name, specialization, courseData }) {
    const navigate = useNavigate();
    const { isCompareMode, toggleCompareMode, selectedCourses, toggleCourseSelection } = useCompare();

    const handleNavigate = (e) => {
        // Prevent navigation when in compare mode or clicking compare-toggle
        // if (isCompareMode || e.target.classList.contains("compare-toggle")) {
        //     return;
        // }
        if (courseID && courseID !== "null") {
            navigate(`/courses/${courseID}`);
        }
    };

    const handleSelectForCompare = (e) => {
        e.stopPropagation(); // Prevent triggering card navigation
        if (!isCompareMode) {
            toggleCompareMode(); // Enter compare mode if not already active
        }
        toggleCourseSelection(courseID, { name, specialization });
    };

    const isSelected = selectedCourses.some((course) => course.courseID === courseID);

    return (
        <div
            className={`cat-course-card ${isCompareMode ? "compare-mode" : ""}`}
            onClick={handleNavigate}
        >
            <div
                className={`compare-toggle ${isSelected ? "selected" : ""}`}
                onClick={handleSelectForCompare}
            >
                {isSelected ? "Selected" : "Compare"}
            </div>
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

export default RelatedCoursesCard;