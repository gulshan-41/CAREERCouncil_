import "./subCategoryGrid.scss";
import SubCategoryCard from "../cards/subCategoryCard/subCategoryCard";

function SubCategoryGrid({ subCategories }) {
    return (
        <div className="sub-cat-container">
            <ul className="sub-cat-list">
                {subCategories.length > 0 ? (
                    subCategories.map((subCat) => (
                        <SubCategoryCard name={subCat.name}/>
                    ))
                ) : (
                    <div>-</div>
                )}
            </ul>
        </div>
    );
}

export default SubCategoryGrid;