import "./searchBar.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "/src/assets/icons/searchBtn1.svg";
import CategoriesGrid from "/src/components/cardsGrid/categoriesGrid/categoriesGrid";
import SearchDiv from "/src/components/searchDiv/searchDiv";
import downArrow from "/src/assets/icons/downArrow.svg";

function SearchBar() {
    const [isOpenCategories, setToOpenCategories] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const navigate = useNavigate();

    const toggleCategories = () => {
        setToOpenCategories((prev) => !prev);
    };

    const toggleSearch = () => {
        setSearchOpen((prev) => !prev);
    };

    const handleCategoryClick = (catID) => {
        navigate(`/categories/${catID}`);
        setToOpenCategories(false); // Close CategoriesGrid on navigation
    };

    return (
        <>
            <div className="parent-container">
                <div className="search-wrapper">
                    <div className="categories" onClick={toggleCategories}>
                        <span className="cat-txt">Categories</span>
                        <span className={`toggle-cat-grid ${isOpenCategories ? "rotate" : ""}`}>
                            <img src={downArrow} alt="down-arrow" />
                        </span>
                    </div>
                    <div className="vr-ruler"></div>
                    <div className="search-input">
                        <input type="search" placeholder="Search?" onClick={toggleSearch} />
                    </div>
                    <div className="search-btn">
                        <img
                            src={searchIcon}
                            alt="Search Icon"
                            className="search-icon"
                            onClick={toggleSearch}
                        />
                    </div>
                </div>
                {isOpenCategories && (
                    <div className="categories-child-container">
                        <div className="heading">
                            <p>Courses categories</p>
                        </div>
                        <CategoriesGrid
                            isNavigationOnly={true}
                            onCategoryClick={handleCategoryClick}
                        />
                    </div>
                )}
            </div>
            <SearchDiv isOpen={isSearchOpen} toggleSearch={toggleSearch} />
        </>
    );
}

export default SearchBar;