import { createContext, useContext, useState } from "react";

const SurveyContext = createContext();

export function SurveyProvider({ children }) {
    const [surveyData, setSurveyData] = useState({
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
            email: "",
            password: "",
            phoneNumber: "",
            username: "", // Add username
            agreeToDataProcessing: false, // Add agreeToDataProcessing
        },
    });

    const updateSurveyData = (key, value) => {
        setSurveyData((prev) => {
            if (typeof value === "object" && (key === "strengths" || key === "interests" || key === "signupDetails")) {
                return {
                    ...prev,
                    [key]: {
                        ...prev[key],
                        ...value,
                    },
                };
            }
            return {
                ...prev,
                ...(typeof value === "object" ? value : { [key]: value }),
            };
        });
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
                email: "",
                password: "",
                phoneNumber: "",
                username: "",
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

export function useSurvey() {
    const context = useContext(SurveyContext);
    if (!context) {
        throw new Error("useSurvey must be used within a SurveyProvider");
    }
    return context;
}