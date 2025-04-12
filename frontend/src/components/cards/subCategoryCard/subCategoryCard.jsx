import "./subCategoryCard.scss";
import rArrow from "/src/assets/icons/right-arrow-sub.svg";

function SubCategoryCard({ name }) {
    return (
        <li>
            <p>{name}</p>
            <img src={rArrow} alt="arrow-btn" />
        </li>
    );
}

export default SubCategoryCard;