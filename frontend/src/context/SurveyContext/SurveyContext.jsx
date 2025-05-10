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
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const hasFetchedUser = useRef(false);

    const updateSurveyData = (key, value) => {
        setSurveyData((prev) => {
            if (typeof value === "object" && (key === "strengths" || key === "interests")) {
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

    const updateLoginData = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const fetchUser = async () => {
        try {
            // console.log('Fetching user');
            const response = await fetch('http://localhost:8800/api/user/getuser', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            }).then((data) => data.json()).catch((error) => console.log(error));
            
            if (response.success) {
                localStorage.setItem('token', JSON.stringify(response.userData))
                setUser(response.userData);

            } else {
                localStorage.removeItem('token');
                setUser(null);
            }
        } catch (error) {
            console.error("Fetch user error:", error);
            throw error;
        }
    };

    const handleLogOut = async () => {
        try {
            const resp = await fetch('http://localhost:8800/api/user/logout', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                credentials: 'include'
            }).then((data) => data.json());

            if (resp.success) {
                toast.success(resp.msg);
                localStorage.removeItem("token");
                setUser(null);
                setSurveyData({
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
                setLoginData({
                    email: "",
                    password: ""
                });
            } else {
                toast.error(resp.msg);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        if (hasFetchedUser.current) return;
        hasFetchedUser.current = true;
        if (fetchUser() ) {
            setUser(JSON.parse(localStorage.getItem('token')));
          }
    }, []);

    return (
        <SurveyContext.Provider value={{ surveyData, updateSurveyData, loginData, setLoginData, updateLoginData, user, setUser, handleLogOut, fetchUser }}>
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