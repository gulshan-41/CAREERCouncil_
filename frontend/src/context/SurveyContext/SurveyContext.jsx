import React, { createContext, useContext, useState } from "react";

const SurveyContext = createContext();

export function SurveyProvider({ children }) {
    const [surveyData, setSurveyData] = useState({
        name: "",
        age: "",
        occupation: "",
        strengths: {
            mathematics: null, // true/false
            management: null, // true/false
            sports: [], // array of selected sports
        },
        interests: {
            science: null, // true/false
            history: null, // true/false
            fields: [], // array of selected career fields
        },
        signupDetails: {
            username: "",
            password: "",
            agreeToDataProcessing: false,
        },
    });

    const updateSurveyData = (section, data) => {
        setSurveyData((prev) => ({
            ...prev,
            [section]: { ...prev[section], ...data },
        }));
    };

    const resetSurveyData = () => {
        setSurveyData({
            name: "",
            age: "",
            occupation: "",
            strengths: {
                mathematics: null,
                management: null,
                sports: [],
            },
            interests: {
                science: null,
                history: null,
                fields: [],
            },
            signupDetails: {
                username: "",
                password: "",
                agreeToDataProcessing: false,
            },
        });
    };

    return (
        <SurveyContext.Provider value={{ surveyData, updateSurveyData, resetSurveyData }}>
            {children}
        </SurveyContext.Provider>
    );
}

export const useSurvey = () => useContext(SurveyContext);