import "./sideBar.scss";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SideBar() {
    const navigate = useNavigate();
    const [sideBarIsOpen, setSideBarToOpen] = useState(false);

    return (
        <>
        {sideBarIsOpen && <div className="sidebar-overlay" onClick={() => setSideBarToOpen(false)}></div>}
        <div className={`sidebar ${sideBarIsOpen ? "open" : ""}`}>
            <div className="toggle-sidebar" onClick={() => setSideBarToOpen(!sideBarIsOpen)}></div>
            <div className="registration">
                <div className="login-signin-wrapper">
                        <button className="side-btns" 
                            onClick={() => {
                                setSideBarToOpen(false);
                                navigate("/signup");
                            }}>
                            Sign-up
                        </button>
                        <button className="side-btns">Log-in</button>
                </div>
                <div className="remember">
                    <span>Do you already have an account?</span>
                </div>
            </div>
            <div className="hr-ruler"></div>
            <div className="links">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/council">
                                Counceling
                            </Link>
                        </li>
                        <li>
                            <Link to="/trend">
                                Trending
                            </Link>
                        </li>
                        <li>
                            <Link to="/about">
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link to="/more">
                                More
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="hr-ruler"></div>
            <div className="controls">
                <div className="settings" onClick={() => navigate("/courses/ML-AI")}>Settings</div>
                <div className="log-out">Log-out</div>
            </div>
        </div>
        </>
    );
}

export default SideBar;