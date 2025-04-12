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
                            <button onClick={toggleSearch}></button>
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