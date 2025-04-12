import "./navBar.scss";
import React from "react";
import { useEffect, useRef } from "react";
import SearchBar from "/src/components/searchBar/searchBar";
import Breadcrum from "/src/components/breadCrum/breadCrum";

function NavBar() {
    const navRef = useRef(null);

    useEffect(() => {
        const setNavHeight = () => {
            if (navRef.current) {
                const navHeight = navRef.current.offsetHeight;
                document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
            }
        };
    
        setNavHeight(); // initial call
    
        window.addEventListener('resize', setNavHeight);
        return () => window.removeEventListener('resize', setNavHeight);
    }, []);

    return(
        <header>
            <div className="sticky-header" ref={navRef}>
                <div className="company-container nav-utility-section">
                    <div className="company-categories nav-utility-container">
                        <div className="logo">
                            <span id="career">CAREER </span><span id="council">Council_</span>
                        </div>
                        <SearchBar />
                    </div>
                </div>
                <div className="nav-bar nav-utility-section">
                    <nav className="breadcrum-nav nav-utility-container">
                        <Breadcrum />
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default NavBar;