import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "/index.scss";
import MainLayout from "/src/layout/mainLayout/mainLayout";
import Homepage from "/src/pages/mainPages/homePage/homepage";
import CategoriesPage from "/src/pages/mainPages/categoriesPage/categoriesPage";
import CoursesPage from "/src/pages/mainPages/coursesPage/coursesPage";
import SignupLayout from "/src/layout/signupLayout/signupLayout";
import SignupPage1A from "/src/pages/signupPages/signupPage1A";
import SignupPage1B from "/src/pages/signupPages/SignupPage1B";
import SignupPage1C from "/src/pages/signupPages/signupPage1C";
import SignupPage2A from "/src/pages/signupPages/signupPage2A";
import SignupPage2B from "/src/pages/signupPages/signupPage2B";
import SignupPage2C from "/src/pages/signupPages/signupPage2C";
import SignupPage3A from "/src/pages/signupPages/signupPage3A";
import SignupPage3B from "/src/pages/signupPages/signupPage3B";
import SignupPage3C from "/src/pages/signupPages/signupPage3C";
import SignupModal from "./pages/signupPages/signupModal";
import { SurveyProvider } from "./context/SurveyContext/SurveyContext";
import { CategoriesProvider } from "./context/CategoriesProvider/CategoriesProvider";
import { CompareProvider } from "./context/CompareContext/CompareContext";
import CompareCapsule from "./components/categoryPageComponent/compareCapsule/compareCapsule";
import CompareGrid from "./components/categoryPageComponent/comparisonGrid/comparisonGrid";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <CategoriesProvider>
            <SurveyProvider>
                <CompareProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<MainLayout />}>
                                <Route index element={<Homepage />} />
                                <Route path="categories/:catID?" element={<CategoriesPage />} />
                                <Route path="courses/:courseID?" element={<CoursesPage />} />
                            </Route>

                            <Route path="signup" element={<SignupLayout />}>
                                <Route index element={<Navigate to="basic-details/name" replace />} />
                                <Route path="basic-details">
                                    <Route path="name" element={<SignupPage1A />} />
                                    <Route path="age" element={<SignupPage1B />} />
                                    <Route path="occupation" element={<SignupPage1C />} />
                                </Route>
                                <Route path="strengths">
                                    <Route index element={<Navigate to="maths" replace />} />
                                    <Route path="maths" element={<SignupPage2A />} />
                                    <Route path="management" element={<SignupPage2B />} />
                                    <Route path="sports" element={<SignupPage2C />} />
                                </Route>
                                <Route path="interest">
                                    <Route index element={<Navigate to="science" replace />} />
                                    <Route path="science" element={<SignupPage3A />} />
                                    <Route path="history" element={<SignupPage3B />} />
                                    <Route path="fields" element={<SignupPage3C />} />
                                </Route>
                            </Route>
                            <Route path="signup-login-modal" element={<SignupModal />} />
                        </Routes>
                        <CompareCapsule />
                        <CompareGrid />
                    </Router>

                    <ToastContainer
                        position='top-right'
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme='colored'
                        style={{ fontSize: '1rem' }}
                    />
                    
                </CompareProvider>
            </SurveyProvider>
        </CategoriesProvider>
    );
}

export default App;