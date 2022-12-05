import React from 'react';
import ReactDOM from 'react-dom/client';
import Paths from './routes/Routes';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

const root = ReactDOM.createRoot(document.getElementById("root"));
const msalInstance = new PublicClientApplication(msalConfig);
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
    <Paths />
    </MsalProvider>
  </React.StrictMode>
);

