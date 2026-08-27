import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { FormspreeProvider } from "@formspree/react";
import { AndishiProvider } from "@andishi/react";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <FormspreeProvider project="2860308000625655395">
      <AndishiProvider
        siteId={
          import.meta.env.ANDISHI_SITE_ID
        }
        publishableKey={
          import.meta.env.ANDISHI_PUBLISHABLE_KEY
        }
      >
        <App />
      </AndishiProvider>
    </FormspreeProvider>
  </BrowserRouter>,
);
