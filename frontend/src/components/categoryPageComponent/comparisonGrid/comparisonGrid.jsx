import "./comparisonGrid.scss";
import { useCompare } from "../../../context/CompareContext/CompareContext";

function CompareGrid() {
    const { selectedCourses, comparisonData, courseLoading, courseError } = useCompare();

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
                </div>
            </div>
        );
    }

    // Define parameters (manually set criteria)
    const parameters = [
        "Duration",
        "Eligibility",
        "Career Prospects",
        "Course Fee",
        "Certification"
    ];

    // Get diff-point values for each course
    const diffPoints1 = comparisonData[course1ID] || [];
    const diffPoints2 = comparisonData[course2ID] || [];

    // Handle empty data
    if (diffPoints1.length === 0 && diffPoints2.length === 0) {
        return (
            <div className="compare-grid-overlay">
                <div className="compare-grid">
                    <div className="no-data">No comparison data available.</div>
                </div>
            </div>
        );
    }

    return (
        <div className="compare-grid-overlay">
            <div className="compare-grid">
                <div className="table-wrapper">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>Parameters</th>
                                <th>{course1.name}</th>
                                <th>{course2.name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parameters.map((parameter, index) => (
                                <tr key={index}>
                                    <td className="parameters">{parameter}</td>
                                    <td className="points">{diffPoints2[index]?.value || "N/A"}</td>
                                    <td className="points">{diffPoints1[index]?.value || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CompareGrid;