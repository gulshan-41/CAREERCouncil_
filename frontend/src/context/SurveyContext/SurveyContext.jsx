import { createContext, useContext, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const SurveyContext = createContext();

export function SurveyProvider({ children }) {
    const [surveyData, setSurveyData] = useState({
        name: "",
        age: "",
        occupation: "",
        email: "",
        password: "",
        strengths: { mathematics: null, management: null, sports: [] },
        interests: { science: null, history: null, fields: [] },
    });
    const [user, setUser] = useState(null);
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const hasFetchedUser = useRef(false);
    const hasFetchedPreferences = useRef(false);

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
            }).then((data) => data.json());

            if (response.success) {
                localStorage.setItem('userData', JSON.stringify(response.userData));
                setUser(response.userData);
            } else {
                setUser(null);
                localStorage.removeItem('userData')
            }
        } catch (error) {
            console.error("Fetch user error:", error);
            throw error;
        }
    };

    // New function to fetch user preferences
    const fetchPreferences = async () => {
        if (hasFetchedPreferences.current) return;
        hasFetchedPreferences.current = true;
        try {
            const response = await fetch("http://localhost:8800/api/user/get-preferences", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }).then((data) => data.json());

            if (response.success && response.preferences) {
                updateSurveyData("interests", { fields: response.preferences.fields || [] });
            }
        } catch (error) {
            console.error("Fetch preferences error:", error);
            // toast.error("Failed to load preferences");
        }
    };

    // New function to save preferences
    const savePreferences = async () => {
        try {
            const response = await fetch("http://localhost:8800/api/user/save-preferences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ fields: surveyData.interests.fields }),
            }).then((data) => data.json());

            if (!response.success) {
                throw new Error("Failed to save preferences");
            }
        } catch (error) {
            console.error("Save preferences error:", error);
            // toast.error("Failed to save preferences");
        }
    };

    const handleLogOut = async () => {
        try {
            const resp = await fetch("http://localhost:8800/api/user/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }).then((data) => data.json());

            if (resp.success) {
                toast.success(resp.msg);
                localStorage.removeItem("userData");
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
                toast.error(resp.msg);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const fields = JSON.parse(localStorage.getItem('userData'));
    console.log(fields.interests.fields);
    

    useEffect(() => {
        if (hasFetchedUser.current) return;
        hasFetchedUser.current = true;
        fetchUser();
        fetchPreferences();
    }, []);

    // Save preferences whenever they change
    useEffect(() => {
        if (surveyData.interests.fields.length > 0 && user) {
            savePreferences();
        }
    }, [surveyData.interests.fields, user]);

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
                fetchPreferences,
                savePreferences,
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