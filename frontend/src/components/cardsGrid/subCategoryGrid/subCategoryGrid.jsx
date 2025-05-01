import "./subCategoryGrid.scss";
import SubCategoryCard from "../../cards/subCategoryCard/subCategoryCard";

function SubCategoryGrid({ relatedCourses }) {
    return (
        <div className="sub-cat-container">
            <ul className="sub-cat-list">
                {relatedCourses.length > 0 ? (
                    relatedCourses.map((course) => (
                        <SubCategoryCard 
                            key={course["CO-ID"] || course.name}
                            name={course.name}
                            courseId={course["CO-ID"]}
                        />
                    ))
                ) : (
                    <div>-</div>
                )}
            </ul>
        </div>
    );
}

export default SubCategoryGrid;