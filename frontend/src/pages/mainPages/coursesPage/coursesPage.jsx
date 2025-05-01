import "./coursesPage.scss";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCategories } from "../../../context/CategoriesProvider/CategoriesProvider"; // Import the context hook
import Introduction from "../../../components/coursePageComponents/courseIntroduction/courseIntroduction";
import AboutCourse from "../../../components/coursePageComponents/aboutCourse/aboutCourse";
import Subjects from "../../../components/coursePageComponents/subjects/subjects";
import Syllabus from "../../../components/coursePageComponents/syllabus/syllabus";
import Opportunities from "../../../components/coursePageComponents/jobOpportunities/jobOpportunities";
import Recommendation from "../../../components/coursePageComponents/recommendedColleges/recommendedColleges";
import Aside from "../../../components/coursePageComponents/aside/aside";

function CoursesPage() {
    // Get the courseId from the URL (e.g., /courses/AI-ML)
    const { courseId } = useParams();
    // Access context
    const { fetchCourseDetails, courseDetails, courseLoading, courseError } = useCategories();

    // Fetch course data when courseId changes
    useEffect(() => {
        fetchCourseDetails(courseId);
    }, [courseId, fetchCourseDetails]);

    // Render loading state
    if (courseLoading) {
        return (
            <div className="">
                <div className="loading-section">
                    <div className="loading-line"></div>
                </div>
            </div>
        );
    }

    // Render error state
    if (courseError[courseId]) {
        return (
            <div className="course">
                <div className="course-wrapper">
                    <p>Error: {courseError[courseId]}</p>
                </div>
            </div>
        );
    }

    // Get course data from context
    const courseData = courseDetails[courseId];

    // Render if no course data (optional safeguard)
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
    <div className="coursespage courses-utility-section">
        <div className="courses-limiters">Limiters</div>
        <div className="coursespage-wrapper">
            <section className="courses-main-section">
                <h1>{courseData.name}</h1>
                <Aside />
                <Introduction data={courseData.introduction} />
                <AboutCourse data={courseData.about} />
                <Subjects data={courseData.subjects} />
                <Syllabus data={courseData.syllabus} />
                <Opportunities />
                <Recommendation />
            </section>
        </div>
    </div>
  );
}

export default CoursesPage;