import "./sideBar.scss";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSurvey } from "../../context/SurveyContext/SurveyContext";

function SideBar() {
    const navigate = useNavigate();
    const { user, handleLogOut } = useSurvey();
    const [sideBarIsOpen, setSideBarToOpen] = useState(false);

    return (
        <>
            {sideBarIsOpen && <div className="sidebar-overlay" onClick={() => setSideBarToOpen(false)}></div>}
            <div className={`sidebar ${sideBarIsOpen ? "open" : ""}`}>
                <div className="toggle-sidebar" onClick={() => setSideBarToOpen(!sideBarIsOpen)}></div>
                {user ? <>
                    <p>Email :- {user.email}</p>
                    <p>User Name :- {user.name}</p>
                    <p>Age :- {user.age}</p>
                    <p>Occupation :- {user.occupation}</p>
                </>
                    : <div className="registration">
                        <div className="login-signin-wrapper">
                            <button className="side-btns"
                                onClick={() => {
                                    setSideBarToOpen(false);
                                    navigate("/signup");
                                }}>
                                Sign-up
                            </button>
                            <button onClick={() => {
                                setSideBarToOpen(false);
                                navigate("/signup-login-modal");
                            }} className="side-btns">Log-in</button>
                        </div>
                        <div className="remember">
                            <span>Do you already have an account?</span>
                        </div>
                    </div>}
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
                    <div className="settings" >Settings</div>
                    {user &&
                        <div className="log-out" onClick={handleLogOut}>Logout</div>
                    }
                </div>
            </div>
        </>
    );
}

export default SideBar;