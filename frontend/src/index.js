import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalStyle } from "./Styles/GlobalStyle";
import { GlobalProvider } from "./Context/globalContext";
import { AuthProvider } from "./Authentication/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <GlobalProvider>
                <GlobalStyle />  {/* ✅ Global styles inside provider for proper styling */}
                <App />
            </GlobalProvider>
        </AuthProvider>
    </React.StrictMode>
);

reportWebVitals();
