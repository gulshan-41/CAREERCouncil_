import "./aside.scss";
import { useState } from "react";
import downBtn from "/src/assets/icons/downArrow.svg";

function Aside() {
    const [isTableOpen, setTableToOpen] = useState(true);

    const toggleContent = () => {
        setTableToOpen((prev) => !prev);
    };
    
    return (
        <aside className="contents-table">
            <div className="content-head">
                <div className="heading">In this article</div>
                <div className="btn-wrapper" onClick={toggleContent}>
                    <img 
                        src={downBtn} 
                        alt="down-arrow" 
                        className={isTableOpen ? "rotate-down" : "rotate-up"} />
                </div>
            </div>
            <div className={`links-grid-wrapper ${isTableOpen ? "open" : "closed"}`}>
                <div className="content-links">
                    <div><a href="#course-introduction">Introduction</a></div>
                    <div><a href="#about-course">About the course</a></div>
                    <div><a href="#subjects">Subjects</a></div>
                    <div><a href="#syllabus">Syllabus</a></div>
                    <div><a href="#job-opportunities">Job opportunities</a></div>
                    <div><a href="colleges">Recommended colleges</a></div>
                </div>
            </div>
        </aside>
    );
}

export default Aside;