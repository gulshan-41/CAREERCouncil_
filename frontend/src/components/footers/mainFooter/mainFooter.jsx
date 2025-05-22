import "./mainFooter.scss";
import Add from "/src/assets/icons/addIcon.svg";
import { useState } from "react";

function MainFooter() {
    const[toggleLinks, setLinksToggleOpen] = useState({
        otherPages: true,
        socialPlatforms: true
    });

    const handleLinksToggle = (id) => {
        setLinksToggleOpen((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    }
    return (
        <div className="main-foot nav-utility-section">
            <div className="foot-subscribe-container foot2-utility-wrapper">
                <div className="newletter-heading">
                    <p className="head-one">Subscribe to our newsletter</p>
                    <p className="head-two">to get updates to our latest articles.</p>
                </div>
                <div className="input-mail">
                    <input type="email" placeholder="Enter your email" />
                    <div className="mail-btn-container">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 25 25"
                            width="18"
                            height="18"
                            fill="#fff"
                            id="mail"
                        >
                            <path d="M21,4H3A3,3,0,0,0,0,7V19a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V7A3,3,0,0,0,21,4ZM2,9.822,7.933,13.6,2,18.683Zm7.651,4.937c.015-.013.021-.032.036-.046l1.239.789a2.01,2.01,0,0,0,2.148,0l1.24-.789c.014.014.02.033.036.046L20.464,20H3.537ZM22,18.683,16.067,13.6,22,9.822ZM3,6H21a1,1,0,0,1,1,1v.451L12,13.814,2,7.451V7A1,1,0,0,1,3,6Z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="footer-wrapper foot2-utility-wrapper">
                <div className="other-links-wrapper links-wrapper">
                    <div
                        id="otherPages"
                        className="links-head"
                        onClick={() => handleLinksToggle("otherPages")}
                    >
                        <p>Other pages</p>
                        {/* <img src={Add} alt="add" /> */}
                    </div>
                    <nav className={toggleLinks.otherPages ? "close" : "open"}>
                        <ul className="links-list">
                            <li><a href="">Categories</a></li>
                            <li><a href="">About us</a></li>
                            <li><a href="">Privacy policy</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="platform-links-wrapper links-wrapper">
                    <div
                        id="socialPlatforms"
                        className="links-head" 
                        onClick={() => handleLinksToggle("socialPlatforms")}
                    >
                        <p>Social platforms</p>
                        {/* <img src={Add} alt="add" /> */}
                    </div>
                    <nav className={toggleLinks.socialPlatforms ? "close" : "open"}>
                        <ul className="links-list">
                            <li><a href="">Linkedin</a></li>
                            <li><a href="">Github</a></li>
                            <li><a href="">Instagram</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="copyright-ribbon">
                <p className="dev-team">Made with sence of decorum & discipline by EDS</p>
                <div className="copyright-label-support">
                    <p>&copy;&nbsp;2024-2025 Ray Tech.</p>
                    <a href="">support.careercouncil@gmail.com</a>
                </div>
            </div>
        </div>
    );
}

export default MainFooter;