import "./searchDiv.scss";
import { useNavigate } from "react-router-dom";
import CategoriesGrid from "/src/components/categoriesGrid/categoriesGrid";
import upperLeftArrow from "/src/assets/icons/upper-left-arrow.svg";

function SearchDiv({ isOpen, toggleSearch }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleCategoryClick = (catID) => {
        navigate(`/categories/${catID}`);
        toggleSearch(); // Close SearchDiv on navigation
    };

    return (
        <>
            <div className="search-div-overlay">
                <div className="search-box">
                    <form>
                        <div className="search-div-input">
                            <input type="search" placeholder="Search?" autoFocus />
                            <button className="close" onClick={toggleSearch}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xml:space="preserve"
                                    width="14px"
                                    height="14px"
                                    id="cross"
                                    viewBox="0 0 52 52"
                                >
                                        <path d="M39 48H9a9 9 0 0 1-9-9V9a9 9 0 0 1 9-9h30c4.968 0 9 4.029 9 9v30c0 4.971-4.032 9-9 9zm3-39c0-1.659-1.341-3-3-3H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30c1.659 0 3-1.341 3-3V9zm-9.516 23.484a2.997 2.997 0 0 1-4.242 0L24 28.242l-4.242 4.242a3 3 0 1 1-4.245-4.242L19.758 24l-4.245-4.242a3 3 0 1 1 4.245-4.242L24 19.758l4.242-4.242c1.173-1.173 3.069-1.173 4.242 0s1.173 3.069 0 4.242L28.242 24l4.242 4.242a2.997 2.997 0 0 1 0 4.242z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="search-suggestions">
                            <ul>
                                <li>
                                    <a href="#">How to get a job in IT as a fresher</a>
                                    <img src={upperLeftArrow} alt="arrow" />
                                </li>
                                <li>
                                    <a href="#">Best companies for freshers in India</a>
                                    <img src={upperLeftArrow} alt="arrow" />
                                </li>
                                <li>
                                    <a href="#">Best courses after 12th Science/Commerce/Arts</a>
                                    <img src={upperLeftArrow} alt="arrow" />
                                </li>
                                <li>
                                    <a href="#">Difference between B.Tech and B.Sc</a>
                                    <img src={upperLeftArrow} alt="arrow" />
                                </li>
                                <li>
                                    <a href="#">Career opportunities in AI & Machine Learning</a>
                                    <img src={upperLeftArrow} alt="arrow" />
                                </li>
                                <li>
                                    <a href="#">Best online courses for coding</a>
                                    <img src={upperLeftArrow} alt="arrow" />
                                </li>
                            </ul>
                        </div>
                        <div className="career-categories">
                            <CategoriesGrid
                                isNavigationOnly={true}
                                onCategoryClick={handleCategoryClick}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SearchDiv;