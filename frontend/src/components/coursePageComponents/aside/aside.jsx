import "./aside.scss";
import { useState } from "react";

function Aside() {
    const [isTableOpen, setTableToOpen] = useState(false);

    const toggleContent = () => {
        setTableToOpen((prev) => !prev);
    };
    
    return (
        <aside className="contents-table">
            <div className="content-head" onClick={toggleContent}>
                <div className="heading-btn">
                    <div className="btn-wrapper">
                        <svg
                            className={isTableOpen ? "rotate-down" : "rotate-up"}
                            xmlns="http://www.w3.org/2000/svg"
                            height="22px"
                            width="22px"
                            fill="#000"
                            viewBox="0 -960 960 960">
                                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                        </svg>
                    </div>
                    <h2>In this article</h2>
                </div>
            </div>
            <nav className={`links-grid-wrapper ${isTableOpen ? "open" : "closed"}`}>
                <ul className="content-links">
                    <li><a href="#course-introduction">Introduction</a></li>
                    <li><a href="#prerequisitie">Prerequisites</a></li>
                    <li><a href="#core-subjects">Core subjects</a></li>
                    <li><a href="#recommended-colleges">Recommended colleges</a></li>
                    <li><a href="#job-opportunities">Job opportunities</a></li>
                </ul>
            </nav>
        </aside>
    );
}

export default Aside;