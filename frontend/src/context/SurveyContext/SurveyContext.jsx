import { createContext, useContext, useEffect, useState } from "react";
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

    const [user, setUser] = useState([]);

    const [loginData, setloginData] = useState({
        email: "",
        password: ""
    });

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
        setloginData({ ...loginData, [e.target.name]: e.target.value });
    }

    //fetchUser
    const fetchUser = async () => {

        try {

            const response = await fetch('http://localhost:8800/api/user/getuser', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            }).then((data) => data.json());

            if (response.success) {
                localStorage.setItem("token", JSON.stringify(response.data));
                setUser(response.data);
            }
            else {
                localStorage.removeItem('token');
                setUser("");
            }

        } catch (error) {
            console.log(error);

        }

    };


    //Logout
    const handleLogOut = async () => {
        try {

            const resp = await fetch('http://localhost:8800/api/user/logout', {
                method: "POST",
                headers: {
                    "Content-Type": 'applicatioin/json'
                },
                credentials: 'include'
            }).then((data) => data.json());

            if (resp.success) {

                toast.success(resp.msg);
                setUser("");
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
                })
                setloginData({
                    email: "",
                    password: ""
                })
                localStorage.removeItem("token");
            }
            else {
                toast.error(resp.msg);
            }

        } catch (error) {

            console.log(error);
        }
    }

    useEffect(() => {
        if (fetchUser()) {
            setUser(JSON.parse(localStorage.getItem('token')));
        }
    }, [])

    return (
        <SurveyContext.Provider value={{ surveyData, updateSurveyData, loginData, setloginData, updateLoginData, user, handleLogOut, fetchUser }}>
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