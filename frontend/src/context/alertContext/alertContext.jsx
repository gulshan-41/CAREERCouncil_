import { createContext, useContext, useState, useRef } from 'react';
import './alertContext.scss';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);
    const counter = useRef(0);

    const showAlert = (message, type = 'error') => {
        const id = counter.current++;
        setAlerts((prev) => [...prev, { id, message, type, removing: false }]);
        setTimeout(() => {
            setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, removing: true } : alert)));
        }, 2700); // 300ms before removal
        setTimeout(() => {
            setAlerts((prev) => prev.filter((alert) => alert.id !== id));
        }, 3000);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <div className="alert-container">
                {alerts.map((alert) => (
                    <Alert key={alert.id} message={alert.message} type={alert.type} removing={alert.removing} />
                ))}
            </div>
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);

const Alert = ({ message, type, removing }) => {
    return (
        <div className={`alert ${type === 'error' ? 'alert-error' : 'alert-success'} ${removing ? 'removing' : ''}`}>
            {message}
        </div>
    );
};