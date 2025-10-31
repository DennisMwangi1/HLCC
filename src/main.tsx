
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { FormspreeProvider } from '@formspree/react';


createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <FormspreeProvider project="2860308000625655395">
            <App />
        </FormspreeProvider>
    </BrowserRouter>
);
