import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAlert } from "../alertContext/alertContext";

const SurveyContext = createContext();

export function SurveyProvider({ children }) {
    const [surveyData, setSurveyData] = useState({
        name: "",
        age: "",
        occupation: "",
        email: "",
        password: "",
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
    });
    const [user, setUser] = useState(null);
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const hasFetchedUser = useRef(false);
    const { showAlert } = useAlert();

    const updateSurveyData = (key, value) => {
        setSurveyData((prev) => {
            if (typeof value === "object" && (key === "strengths" || key === "interests")) {
                return { ...prev, [key]: { ...prev[key], ...value } };
            }
            return { ...prev, ...(typeof value === "object" ? value : { [key]: value }) };
        });
    };

    const updateLoginData = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const fetchUser = async () => {
        try {
            const response = await fetch("http://localhost:8800/api/user/getuser", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                throw new Error(`Expected JSON, got ${contentType || "no content-type"}: ${text}`);
            }

            const data = await response.json();
            if (data.success) {
                setUser(data.userData);
                setSurveyData((prev) => ({
                    ...prev,
                    name: data.userData.name || "",
                    age: data.userData.age || "",
                    occupation: data.userData.occupation || "",
                    email: data.userData.email || "",
                    strengths: data.userData.strengths || prev.strengths,
                    interests: data.userData.interests || prev.interests,
                }));
            } else {
                setUser(null);
                showAlert(data.msg || "Failed to fetch user", "error");
            }
        } catch (error) {
            console.error("Fetch user error:", error);
            setUser(null);
            showAlert("Failed to fetch user", "error");
        }
    };

    const handleLogOut = async () => {
        try {
            const response = await fetch("http://localhost:8800/api/user/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                showAlert(data.msg, "success");
                setUser(null);
                setSurveyData({
                    name: "",
                    age: "",
                    occupation: "",
                    email: "",
                    password: "",
                    strengths: { mathematics: null, management: null, sports: [] },
                    interests: { science: null, history: null, fields: [] },
                });
                setLoginData({ email: "", password: "" });
            } else {
                showAlert(data.msg, "error");
            }
        } catch (error) {
            console.error("Logout error:", error);
            showAlert("Failed to log out", "error");
        }
    };

    useEffect(() => {
        if (hasFetchedUser.current) return;
        hasFetchedUser.current = true;
        fetchUser();
    }, []);

    return (
        <SurveyContext.Provider
            value={{
                surveyData,
                updateSurveyData,
                loginData,
                setLoginData,
                updateLoginData,
                user,
                setUser,
                handleLogOut,
                fetchUser,
            }}
        >
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