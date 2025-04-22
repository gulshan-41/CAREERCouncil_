import "./coursesPage.scss";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Introduction from "../../../components/coursePageComponents/courseIntroduction/courseIntroduction";
import AboutCourse from "../../../components/coursePageComponents/aboutCourse/aboutCourse";
import Subjects from "../../../components/coursePageComponents/subjects/subjects";
import Syllabus from "../../../components/coursePageComponents/syllabus/syllabus";
import Opportunities from "../../../components/coursePageComponents/jobOpportunities/jobOpportunities";
import Recommendation from "../../../components/coursePageComponents/recommendedColleges/recommendedColleges";
import Aside from "../../../components/coursePageComponents/aside/aside";

function CoursesPage () {
    // State to store the fetched course data.
    const [courseData, setCourseData] = useState(null);
    // State to handle loading.
    const [loading, setLoading] = useState(true);
    // State to handle errors.
    const [error, setError] = useState(null);
    // Get the courseId from the URL (e.g., /courses/AI-ML)
    const { courseId } = useParams();

    // Fetch the JSON data when the component mounts or courseId changes.
    useEffect(() => {
    const fetchCourseData = async () => {
        try {
            setLoading(true); // Set loading to true while fetching
            setError(null); // Reset error state
            // Construct the URL to the JSON file (e.g., /data/courses/AI-ML.json)
            const response = await fetch(`/data/courses/${courseId}.json`);
            // Check if the response is ok
            if (!response.ok) {
                throw new Error("Course not found");
            }
            // Parse the JSON data
            const data = await response.json();
            setCourseData(data); // Store the fetched data in state
            } catch (err) {
                setError(err.message); // Set error message if fetch fails
            } finally {
                setLoading(false); // Set loading to false after fetch completes
            }
        };

        fetchCourseData(); // Call the fetch function
    }, [courseId]); // Re-run the effect if courseId changes

    // Render loading state
    if (loading) {
        return (
            <div className="cat-utility-section">
                <div className="loading-section">
                    <div className="loading-line"></div>
                </div>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="course">
                <div className="course-wrapper">
                    <p>Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="course">
            <div className="course-wrapper">
            <section className="main-section">
                <h1>{courseData.name}</h1>
                <Introduction data={courseData.introduction}/>
                <AboutCourse data={courseData.about}/>
                <Subjects data={courseData.subjects}/>
                <Syllabus />
                <Opportunities />
                <Recommendation />
            </section>
            <section className="aside-section">
                <Aside />
            </section>
            </div>
        </div>
    );
}

export default CoursesPage;