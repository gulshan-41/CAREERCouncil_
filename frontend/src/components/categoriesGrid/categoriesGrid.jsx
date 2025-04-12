import "./categoriesGrid.scss";
import CategoriesCard from "../cards/categoriesCard/categoriesCard";
import { useCategoriesContext } from "/src/pages/mainPages/categoriesPage/categoriesPage";

const categories = [
    { catID: "Engineering", text: "Engineering" },
    { catID: "Medical", text: "Medical" },
    { catID: "Management", text: "Management" },
    { catID: "CivilServices", text: "Civil Services" },
    { catID: "Media", text: "Media" },
    { catID: "ArmedForces", text: "Armed Forces" },
    { catID: "Jee", text: "JEE" },
    { catID: "Neet", text: "NEET" },
    { catID: "It", text: "IT" },
    { catID: "Cse", text: "CSE" },
    { catID: "Aviation", text: "Aviation" },
    { catID: "Hospitality", text: "Hospitality" },
    { catID: "Teaching", text: "Teaching" },
    { catID: "Animated", text: "Animation" },
    { catID: "Phe", text: "Physical Edu." },
    { catID: "Law", text: "Law" },
];

function CategoriesGrid({ isNavigationOnly = false, onCategoryClick }) {
    const context = useCategoriesContext();
    const { activeCategory, setActiveCategory, toggleCategory } = context || {};

    const handleCardClick = (catID) => {
        console.log("Category card clicked in CategoriesGrid:", catID);
        if (isNavigationOnly && onCategoryClick) {
            onCategoryClick(catID); // Navigate in SearchBar/SearchDiv
        } else if (toggleCategory) {
            toggleCategory(catID); // Interactive in CategoriesPage
        }
    };

    const handleIconClick = (catID) => {
        if (!isNavigationOnly && setActiveCategory) {
            console.log("Icon clicked for category:", catID);
            setActiveCategory((prev) => (prev === catID ? null : catID));
        }
    };

    return (
        <div className="categories-grid">
            {categories.map((category) => (
                <CategoriesCard
                    key={category.catID}
                    catID={category.catID}
                    text={category.text}
                    onClick={() => handleCardClick(category.catID)}
                    onIconClick={() => handleIconClick(category.catID)}
                    isDropdownActive={!isNavigationOnly && activeCategory === category.catID}
                    isActive={!isNavigationOnly && activeCategory === category.catID}
                    isNavigationOnly={isNavigationOnly}
                />
            ))}
        </div>
    );
}

export default CategoriesGrid;