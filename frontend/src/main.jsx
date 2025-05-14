import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Component } from 'react';
class ErrorBoundary extends Component {
    state = { error: null };
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        }
        return this.props.children;
    }
}

ReactDOM.createRoot(document.getElementById('page-wrapper')).render(
    <React.StrictMode>
        <ErrorBoundary>
            <App />
            <span id="limiter">Limiter</span>
        </ErrorBoundary>
    </React.StrictMode>
);