import "./hcategoriesGrid.scss";
import HcategoriesCard from "/src/components/cards/hcategoriesCard/HcategoriesCard";
import { useCategories } from "/src/context/CategoriesProvider/CategoriesProvider";

function HcategoriesGrid() {
    const { categories, categoriesLoading, categoriesError } = useCategories();

    if (categoriesLoading) {
        return <div className="hcat-grid-loading">Loading categories...</div>;
    }

    if (categoriesError) {
        return <div className="hcat-grid-error">Error: {categoriesError}</div>;
    }

    return (
        <div className="hcat-grid">
        {categories.map((category) => (
            <HcategoriesCard
                key={category.catID}
                catID={category.catID}
                text={category.text}
                description={category.description}
            />
        ))}
        </div>
    );
}

export default HcategoriesGrid;