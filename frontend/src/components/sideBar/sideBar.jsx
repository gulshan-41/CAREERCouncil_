import "./sideBar.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../context/SurveyContext/SurveyContext";

function SideBar({ mainSectionRef }) {
    const navigate = useNavigate();
    const { user, handleLogOut } = useSurvey();
    const [sideBarIsOpen, setSideBarToOpen] = useState(false);

    useEffect(() => {
        let resizeTimeout;

        const updateSidebarPosition = () => {
            const sidebar = document.querySelector(".sidebar");
            if (!sidebar || !mainSectionRef.current) return;

            const viewportWidth = window.innerWidth;
            const mainSectionWidth = mainSectionRef.current.offsetWidth;
            const right = (viewportWidth - mainSectionWidth) / 2;

            if (viewportWidth >= 1536) {
                sidebar.style.right = `${right}px`;
                sidebar.classList.add("positioned");
            } else {
                sidebar.style.right = "";
                sidebar.classList.remove("positioned");
            }
        };

        // Debounced resize handler
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateSidebarPosition, 100);
        };

        // Initial positioning
        requestAnimationFrame(updateSidebarPosition);

        // Update on resize
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimeout);
        };
    }, [mainSectionRef]);

    return (
        <>
            {sideBarIsOpen && <div className="sidebar-overlay" onClick={() => setSideBarToOpen(false)}></div>}
            <div className={`sidebar ${sideBarIsOpen ? "open" : "close"}`}>
                <div className="toggle-sidebar" onClick={() => setSideBarToOpen(!sideBarIsOpen)}></div>
                <div className="sidebar-tabs-wrapper">
                    {user ? <div className="user-log">
                        <div className="user-img-circle"></div>
                        <div className="user-name-mail">
                            <p>{user.email}</p>
                            <p>{user.name}</p>
                        </div>
                </div>
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
                                <li><a href="#home">Home</a></li>
                                <li><a href="#councelling">Councelling</a></li>
                                <li><a href="#categories">Categories</a></li>
                                <li><a href="#trending-courses">Trending</a></li>
                                <li><a href="#about-us">About us</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="hr-ruler"></div>
                    <div className="controls">
                        {/* <div className="settings" >Settings</div> */}
                        {user &&
                            <div className="log-out" onClick={handleLogOut}>Logout</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;