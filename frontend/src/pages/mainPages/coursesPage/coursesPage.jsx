import "./coursesPage.scss";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCategories } from "../../../context/CategoriesProvider/CategoriesProvider";
import Introduction from "../../../components/coursePageComponents/courseIntroduction/courseIntroduction";
import Prerequsities from "../../../components/coursePageComponents/prerequsities/prerequisites";
import CoreSubjects from "../../../components/coursePageComponents/coreSubjects/coreSubjects";
import RecommendedColleges from "../../../components/coursePageComponents/recommendedColleges/recommendedColleges";
import JobRoles from "../../../components/coursePageComponents/jobRoles/jobRoles";
import AboutCourse from "../../../components/coursePageComponents/aboutCourse/aboutCourse";
import Syllabus from "../../../components/coursePageComponents/syllabus/syllabus";
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
                <Prerequsities data={courseData.prerequisites} />
                <CoreSubjects data={courseData.subjects}/>
                <RecommendedColleges data={courseData.recommendedColleges} />
                <JobRoles data={courseData.jobRoles}/>
                {/* <AboutCourse data={courseData.about} /> */}
                {/* <Syllabus data={courseData.syllabus} /> */}
            </section>
        </div>
    </div>
  );
}

export default CoursesPage;