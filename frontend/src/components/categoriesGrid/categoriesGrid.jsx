import "./categoriesGrid.scss";
import CategoriesCard from "../cards/categoriesCard/categoriesCard";
import { useCategoriesContext } from "/src/pages/mainPages/categoriesPage/categoriesPage";
import { useCategories } from "/src/context/CategoriesProvider/CategoriesProvider";

function CategoriesGrid({ isNavigationOnly = false, onCategoryClick }) {
    const { categories, categoriesLoading, categoriesError } = useCategories();
    const context = useCategoriesContext();
    const { openDropdowns, toggledCategories, toggleCategory, toggleDropdown } = context || {};

    const handleCardClick = (catID) => {
        console.log("Category card clicked in CategoriesGrid:", catID);
        if (isNavigationOnly && onCategoryClick) {
            onCategoryClick(catID); // Navigate in SearchBar/SearchDiv
        } else if (toggleCategory) {
            toggleCategory(catID); // Interactive in CategoriesPage
        }
    };

    const handleIconClick = (catID) => {
        if (!isNavigationOnly && toggleDropdown) {
            console.log("Icon clicked for category:", catID);
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