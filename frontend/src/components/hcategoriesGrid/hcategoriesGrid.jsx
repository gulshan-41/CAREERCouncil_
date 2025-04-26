import "./hcategoriesGrid.scss";
import { useState } from "react";
import HcategoriesCard from "/src/components/cards/hcategoriesCard/HcategoriesCard";
import { useCategories } from "/src/context/CategoriesProvider/CategoriesProvider";

function HcategoriesGrid() {
    const { categories, categoriesLoading, categoriesError } = useCategories();
    const [areAllcatsOpen, setAllcatsToOpne] = useState(false);

    const toggleAllCats = () => {
        setAllcatsToOpne((prev) => !prev);
    };

    if (categoriesLoading) {
        return <div className="hcat-grid-loading">Loading categories...</div>;
    }

    if (categoriesError) {
        return <div className="hcat-grid-error">Error: {categoriesError}</div>;
    }

    const showCards = categories.slice(0, 6);
    const subCards = categories.slice(6);

    return (
        <div className="hcat-grid">
            <div className="hcat-show-grid">
                {showCards.map((category) => (
                    <HcategoriesCard
                        key={category.catID}
                        catID={category.catID}
                        text={category.text}
                        description={category.description}
                    />
                ))}
            </div>
            <div className={`hcat-all-wrapper ${areAllcatsOpen ? "open" : "close"}`}>
                <div className="hcat-subgrid">
                    {subCards.map((category) => (
                        <HcategoriesCard
                            key={category.catID}
                            catID={category.catID}
                            text={category.text}
                            description={category.description}
                        />
                    ))}
                </div>
            </div>
            <div className="toggle-all-cats">
                <p onClick={toggleAllCats}>
                    <svg
                        id="hcat-toggle-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        height="28px"
                        viewBox="0 -960 960 960"
                        width="28px"
                        fill="#8724DB">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                    </svg>

                    {areAllcatsOpen ? "close" : "Browse all categories"}
                </p>
            </div>
        </div>
    );
}

export default HcategoriesGrid;