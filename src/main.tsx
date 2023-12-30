import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { setupIonicReact } from "@ionic/react";
import ReactGA from "react-ga4";

// IonicReact 초기화
setupIonicReact();

// ga4 초기화
ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <IonApp>
    <IonReactRouter>
      <App />
    </IonReactRouter>
  </IonApp>
);
