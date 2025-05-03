import "./coursesPage.scss";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCategories } from "../../../context/CategoriesProvider/CategoriesProvider";
import Introduction from "../../../components/coursePageComponents/courseIntroduction/courseIntroduction";
import AboutCourse from "../../../components/coursePageComponents/aboutCourse/aboutCourse";
import Subjects from "../../../components/coursePageComponents/subjects/subjects";
import Syllabus from "../../../components/coursePageComponents/syllabus/syllabus";
import Opportunities from "../../../components/coursePageComponents/jobOpportunities/jobOpportunities";
import Recommendation from "../../../components/coursePageComponents/recommendedColleges/recommendedColleges";
import Aside from "../../../components/coursePageComponents/aside/aside";

function CoursesPage() {
    // Get the courseID from the URL (e.g., /courses/AI-ML)
    const { courseID } = useParams();
    // Access context
    const { fetchCourseDetails, courseDetails, courseLoading, courseError } = useCategories();

    // Fetch course data when courseID changes
    useEffect(() => {
        fetchCourseDetails(courseID);
    }, [courseID, fetchCourseDetails]);

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
    if (courseError[courseID]) {
        return (
            <div className="course">
                <div className="course-wrapper">
                    <p>Error: {courseError[courseID]}</p>
                </div>
            </div>
        );
    }

    // Get course data from context
    const courseData = courseDetails[courseID];

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
                {/* <Aside /> */}
                <Introduction data={courseData.introduction} />
                {/* <AboutCourse data={courseData.about} />
                <Subjects data={courseData.subjects} />
                <Syllabus data={courseData.syllabus} />
                <Opportunities />
                <Recommendation data={courseData.colleges} /> */}
            </section>
        </div>
    </div>
  );
}

export default CoursesPage;