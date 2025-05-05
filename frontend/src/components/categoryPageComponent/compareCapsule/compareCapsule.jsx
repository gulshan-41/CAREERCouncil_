import "./compareCapsule.scss";
import { useCompare } from "/src/context/CompareContext/CompareContext";

function CompareCapsule() {
    const { selectedCourses, exitCompareMode } = useCompare();

    // Don't render if no courses are selected
    if (selectedCourses.length === 0) {
        return null;
    }

    // Get course names for display
    const courseNames = selectedCourses.map((course) => course.name).join(" Vs ");

    return (
        <div className="compare-capsule visible">
            <div className="capsule-content">
                <span>
                    {courseNames || "Select two courses to compare!"}
                    {selectedCourses.length === 1 && courseNames && " - Select one more course!"}
                </span>
                <button className="close-button" onClick={exitCompareMode}>
                    x
                </button>
            </div>
        </div>
    );
}

export default CompareCapsule;