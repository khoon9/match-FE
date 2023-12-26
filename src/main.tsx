import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { setupIonicReact } from "@ionic/react";

// IonicReact 초기화
setupIonicReact();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <IonApp>
    <IonReactRouter>
      <App />
    </IonReactRouter>
  </IonApp>
);
