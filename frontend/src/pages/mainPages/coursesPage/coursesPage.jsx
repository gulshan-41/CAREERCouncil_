import "./coursesPage.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCategories } from "../../../context/CategoriesProvider/CategoriesProvider";
import Aside from "../../../components/coursePageComponents/aside/aside";
import Introduction from "../../../components/coursePageComponents/courseIntroduction/courseIntroduction";
import Prerequsities from "../../../components/coursePageComponents/prerequsities/prerequisites";
import CoreSubjects from "../../../components/coursePageComponents/coreSubjects/coreSubjects";
import RecommendedColleges from "../../../components/coursePageComponents/recommendedColleges/recommendedColleges";
import JobRoles from "../../../components/coursePageComponents/jobRoles/jobRoles";
import RecommendedCoursesGrid from "../../../components/cardsGrid/recommendedCoursesGrid/recommendedCoursesGrid";

function CoursesPage() {
    const { courseID } = useParams();
    const { fetchCourseDetails, courseDetails, courseLoading, courseError } = useCategories();

    useEffect(() => {
        if (courseID) {
            fetchCourseDetails(courseID);
        }
    }, [courseID, fetchCourseDetails]);

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
            <div className="courses-limiters">Limiters</div>
            <div className="coursespage-wrapper">
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