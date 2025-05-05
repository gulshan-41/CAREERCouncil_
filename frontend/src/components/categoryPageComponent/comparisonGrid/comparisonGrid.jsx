import "./comparisonGrid.scss";
import { useCompare } from "/src/context/CompareContext/CompareContext";

function CompareGrid() {
    const { selectedCourses, comparisonData, courseLoading, courseError, toggleCourseSelection } = useCompare();

    // Only render when exactly 2 courses are selected
    if (selectedCourses.length !== 2) {
        return null;
    }

    const [course1, course2] = selectedCourses;
    const course1ID = course1.courseID;
    const course2ID = course2.courseID;

    // Handle loading state
    if (courseLoading[course1ID] || courseLoading[course2ID]) {
        return (
            <div className="compare-grid-overlay">
                <div className="compare-grid">
                    <div className="loading">Loading comparison data...</div>
                </div>
            </div>
        );
    }

    // Handle error state
    if (courseError[course1ID] || courseError[course2ID]) {
        return (
            <div className="compare-grid-overlay">
                <div className="compare-grid">
                    <div className="error">
                        {courseError[course1ID] ? `Error for ${course1.name}: ${courseError[course1ID]}` : ""}
                        {courseError[course2ID] ? `Error for ${course2.name}: ${courseError[course2ID]}` : ""}
                    </div>
                    <button className="close-button" onClick={() => toggleCourseSelection(course1ID, course1)}>
                        Close
                    </button>
                </div>
            </div>
        );
    }

    // Get unique diff-point keys
    const diffPoints1 = comparisonData[course1ID] || [];
    const diffPoints2 = comparisonData[course2ID] || [];
    const allPoints = [...new Set([
        ...diffPoints1.map(item => item.point),
        ...diffPoints2.map(item => item.point)
    ])];

    // Handle empty data
    if (allPoints.length === 0) {
        return (
            <div className="compare-grid-overlay">
                <div className="compare-grid">
                    <div className="no-data">No comparison data available.</div>
                    <button className="close-button" onClick={() => toggleCourseSelection(course1ID, course1)}>
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="compare-grid-overlay">
            <div className="compare-grid">
                <button
                    className="close-button"
                    onClick={() => toggleCourseSelection(course1ID, course1)} // Close grid by removing one course
                >
                    ×
                </button>
                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th>Criteria</th>
                            <th>
                                {course1.name}
                                <button
                                    className="remove-course"
                                    onClick={() => toggleCourseSelection(course1ID, course1)}
                                >
                                    Remove
                                </button>
                            </th>
                            <th>
                                {course2.name}
                                <button
                                    className="remove-course"
                                    onClick={() => toggleCourseSelection(course2ID, course2)}
                                >
                                    Remove
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPoints.map((point, index) => {
                            const point1 = diffPoints1.find(item => item.point === point);
                            const point2 = diffPoints2.find(item => item.point === point);
                            return (
                                <tr key={index}>
                                    <td>{point}</td>
                                    <td>{point1 ? point1.value : "N/A"}</td>
                                    <td>{point2 ? point2.value : "N/A"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CompareGrid;