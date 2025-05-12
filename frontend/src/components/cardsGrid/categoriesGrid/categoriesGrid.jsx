import "./categoriesGrid.scss";
import CategoriesCard from "../../cards/categoriesCard/categoriesCard";
import { useCategories } from "/src/context/CategoriesProvider/CategoriesProvider";

function CategoriesGrid({ isNavigationOnly = false, onCategoryClick }) {
    const { 
        categories, 
        categoriesLoading, 
        categoriesError, 
        openDropdowns, 
        toggledCategories, 
        toggleCategory, 
        toggleDropdown 
    } = useCategories();

    const handleCardClick = (catID) => {
        if (isNavigationOnly && onCategoryClick) {
            onCategoryClick(catID); // Navigate in SearchBar/SearchDiv
            toggleCategory(catID);
        } else if (toggledCategories.includes(catID)) {
            const element = document.getElementById(`category-details-${catID}`);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            } else {
                console.warn(`No element found for category-details-${catID}`);
            }
        } else if (toggleCategory) {
            toggleCategory(catID); // Interactive in CategoriesPage
        }
    };

    const handleIconClick = (catID) => {
        if (!isNavigationOnly && toggleDropdown) {
            // console.log("Icon clicked for category:", catID);
            toggleDropdown(catID); // Toggle dropdown for this category
        }
    };

    if (categoriesLoading) return <div>Loading categories...</div>;
    if (categoriesError) return <div>Error: {categoriesError}</div>;

    return (
        <div className="categories-grid">
            {categories.map((category) => (
                <CategoriesCard
                    key={category.catID}
                    catID={category.catID}
                    text={category.text}
                    onClick={() => handleCardClick(category.catID)}
                    onIconClick={() => handleIconClick(category.catID)}
                    isDropdownActive={!isNavigationOnly && openDropdowns.includes(category.catID)}
                    isActive={!isNavigationOnly && toggledCategories.includes(category.catID)}
                    isNavigationOnly={isNavigationOnly}
                />
            ))}
        </div>
    );
}

export default CategoriesGrid;