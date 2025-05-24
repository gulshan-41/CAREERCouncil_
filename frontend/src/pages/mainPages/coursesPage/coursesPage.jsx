import "./coursesPage.scss";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useCategories } from "../../../context/CategoriesProvider/CategoriesProvider";
import Aside from "../../../components/coursePageComponents/aside/aside";
import Introduction from "../../../components/coursePageComponents/courseIntroduction/courseIntroduction";
import Prerequsities from "../../../components/coursePageComponents/prerequsities/prerequisites";
import CoreSubjects from "../../../components/coursePageComponents/coreSubjects/coreSubjects";
import RecommendedColleges from "../../../components/coursePageComponents/recommendedColleges/recommendedColleges";
import JobRoles from "../../../components/coursePageComponents/jobRoles/jobRoles";
import RecommendedCoursesGrid from "../../../components/cardsGrid/recommendedCoursesGrid/recommendedCoursesGrid";
import FeedbackForm from "../../../components/Forms/feedbackForm/feedbackForm";

function CoursesPage() {
    const { courseID } = useParams();
    const { fetchCourseDetails, courseDetails, courseLoading, courseError } = useCategories();
    const wrapperRef = useRef(null);

    const [isFeedbackOpen, setFeedbackToOpen] = useState(false);

    const handleFeedback = () => {
        setFeedbackToOpen((prev) => !prev);
    }

    useEffect(() => {
        let resizeTimeout;

        // Position courses-limiters
        const updateTogglesPosition = () => {
            const toggles = document.getElementById("courses-limiters");
            if (!toggles || !wrapperRef.current) return;

            const viewportWidth = window.innerWidth;
            const wrapperWidth = wrapperRef.current.offsetWidth;
            const left = (viewportWidth - wrapperWidth) / 2 - 60;

            if (viewportWidth >= 768) {
                toggles.style.left = `${left}px`;
            } else {
                toggles.style.left = "";
            }
        };

        // Debounced resize handler
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateTogglesPosition, 10);
        };

        // Initial positioning after DOM render
        const initialPosition = () => {
            requestAnimationFrame(updateTogglesPosition);
        };

        // Fetch course details and position
        if (courseID) {
            fetchCourseDetails(courseID);
        }

        // Position after mount and data load
        initialPosition();

        // Update on resize
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimeout);
        };
    }, [courseID, fetchCourseDetails, courseDetails, courseLoading]);

    if (courseLoading[courseID]) {
        return (
            <div className="">
                <div className="loading-section">
                    <div className="loading-line"></div>
                </div>
            </div>
        );
    }

    if (courseError[courseID]) {
        return (
            <div className="course">
                <div className="course-wrapper">
                    <p>Error: {courseError[courseID]}</p>
                </div>
            </div>
        );
    }

    const courseData = courseDetails[courseID];

    if (!courseData) {
        return (
            <div className="course">
                <div className="course-wrapper">
                    <p>No course data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="coursespage cat-utility-section">
            <div className="coursespage-wrapper" ref={wrapperRef}>
                <div className="courses-limiters" id="courses-limiters">
                    <div className="feedback-wrapper" onClick={handleFeedback}>
                        <p>Feedback</p>
                    </div>
                    {isFeedbackOpen && <FeedbackForm handleFeedbackOpening={handleFeedback} />}
                </div>
                <section className="courses-main-section">
                    <h1>{courseData.name}</h1>
                        <RecommendedCoursesGrid currentCourseID={courseID} />
                        <Aside />
                        <Introduction data={courseData.introduction[0]} />
                        <Prerequsities data={courseData.prerequisites[0]} />
                        <CoreSubjects data={courseData.subjects[0]} />
                        <RecommendedColleges data={courseData.recommendedColleges[0]} />
                        <JobRoles data={courseData.jobRoles[0]} />
                </section>
            </div>
        </div>
    );
}

export default CoursesPage;