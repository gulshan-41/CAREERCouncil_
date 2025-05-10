import "./compareCapsule.scss";
import React from "react";
import { useCompare } from "/src/context/CompareContext/CompareContext";

function CompareCapsule() {
    const { selectedCourses, exitCompareMode } = useCompare();

    // Don't render if no courses are selected
    if (selectedCourses.length === 0) {
        return null;
    }

    return (
        <div className="compare-capsule visible">
            <div className="capsule-content">
                {selectedCourses.length > 0 ? (
                    <>
                        {selectedCourses.map((course, index) => (
                            <React.Fragment key={course.name}>
                                <span className="course-name">{course.name}</span>
                            </React.Fragment>
                        ))}
                        {selectedCourses.length === 1 && (
                            <span className="more-course-prompt">Select one more course!</span>
                        )}
                    </>
                ) : (
                    <span className="fallback-message">Select two courses to compare!</span>
                )}
                <span className="close-button" onClick={exitCompareMode}>x</span>
            </div>
        </div>
    );
}

export default CompareCapsule;