import "./categoriesCard.scss";
import SubCategoryGrid from "/src/components/cardsGrid/subCategoryGrid/subCategoryGrid";
import { useCategories } from "/src/context/CategoriesProvider/CategoriesProvider";

function CategoriesCard({
    catID,
    text,
    onClick,
    onIconClick,
    isDropdownActive,
    isActive,
    isNavigationOnly = false,
}) {
    const { categoryDetails } = useCategories();
    const relatedCourses = categoryDetails[catID]?.relatedCourses || [];

    return (
        <div className={`cat-card-wrapper ${isActive ? "active" : ""}`} onClick={onClick}>
            <div className="categories-card-container">
                <div className="category-text-wrapper">
                    <p>{text}</p>
                </div>
                <div className="link-to">
                    <svg
                        id="angle-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        height="26px"
                        width="26px"
                        fill="#fff"
                    >
                        <path d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z" />
                    </svg>
                </div>
                {!isNavigationOnly && (
                <div className="toggle-sub">
                    <svg
                        id="add-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        height="21px"
                        viewBox="0 -960 960 960"
                        width="21px"
                        className={`add-icon ${isDropdownActive ? "hidden" : "show"}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onIconClick();
                        }}
                    >
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                    <svg
                        id="minus-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        height="21px"
                        viewBox="0 -960 960 960"
                        width="21px"
                        className={`minus-icon ${isDropdownActive ? "show" : "hidden"}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onIconClick();
                        }}
                    >
                        <path d="M200-440v-80h560v80H200Z" />
                    </svg>
                </div>
                )}
                <div className="trackball"></div>
            </div>

            {!isNavigationOnly && (
            <div className={`sub-cat-wrapper off-view ${isDropdownActive ? "open" : "close"}`}>
                {isDropdownActive && relatedCourses.length > 0 && (
                    <SubCategoryGrid relatedCourses={relatedCourses} />
                )}
            </div>
            )}
        </div>
    );
}

export default CategoriesCard;