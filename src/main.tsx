import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import "./i18n";
import ErrorBoundary from "./components/error-boundary.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Toaster />
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
