import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AndishiProvider } from "@andishi/runtime/react";
import App from "./App.tsx";
import "./index.css";
import { FormspreeProvider } from "@formspree/react";
import { andishiConfig } from "@/lib/andishi";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <FormspreeProvider project="2860308000625655395">
      <AndishiProvider
        config={{ apiUrl: andishiConfig.apiUrl, siteKey: andishiConfig.siteKey }}
        edit={andishiConfig.studioOrigin ? { studioOrigin: andishiConfig.studioOrigin } : true}
      >
        <App />
      </AndishiProvider>
    </FormspreeProvider>
  </BrowserRouter>,
);
