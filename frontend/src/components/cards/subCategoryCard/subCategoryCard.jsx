import "./subCategoryCard.scss";
import { useNavigate } from "react-router-dom";

function SubCategoryCard({ courseId, name }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (courseId && courseId !== "null") {
            navigate(`/courses/${courseId}`);
        }
    };

    return (
        <li onClick={handleNavigate}>
            <p>{name}</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                width="20px"
                viewBox="0 0 24 24"
                id="angle-right">
                    <path fill="#000" d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"></path>
            </svg>
        </li>
    );
}

export default SubCategoryCard;