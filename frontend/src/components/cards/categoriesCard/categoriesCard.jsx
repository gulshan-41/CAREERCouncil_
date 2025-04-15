import "./categoriesCard.scss";
import SubCategoryGrid from "/src/components/subCategoryGrid/subCategoryGrid";
import rightArrow from "/src/assets/icons/angleRightArrow.svg";
import { useCategoriesContext } from "/src/pages/mainPages/categoriesPage/categoriesPage";

function CategoriesCard({
    catID,
    text,
    onClick,
    onIconClick,
    isDropdownActive,
    isActive,
    isNavigationOnly = false,
    }) 
    
    {
    
    const context = useCategoriesContext();
    const relatedCourses = context?.relatedCourses || [];

    return (
        <div className={`cat-card-wrapper ${isActive ? "active" : ""}`} onClick={onClick}>
            <div className="categories-card-container">
                <div className="category-text-wrapper">
                    <p>{text}</p>
                </div>
                <div className="link-to">
                    <img src={rightArrow} alt="right-arrow" /> {/* Hidden in SearchBar/SearchDiv via CSS */}
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