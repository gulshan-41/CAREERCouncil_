import "./subCategoryGrid.scss";
import SubCategoryCard from "../cards/subCategoryCard/subCategoryCard";

function SubCategoryGrid({ relatedCourses }) {
    return (
        <div className="sub-cat-container">
            <ul className="sub-cat-list">
                {relatedCourses.length > 0 ? (
                    relatedCourses.map((catCourse, index) => (
                        <SubCategoryCard key={index} name={catCourse.name}/>
                    ))
                ) : (
                    <div>-</div>
                )}
            </ul>
        </div>
    );
}

export default SubCategoryGrid;