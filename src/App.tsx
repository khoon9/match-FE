import React from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import { IonRouterOutlet, IonTabBar, IonTabs } from "@ionic/react";
import VisionPage from "./page/VisionPage";

function App() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/vision" component={VisionPage} exact />
        <Route path="/" render={() => <Redirect to="/vision" />} exact />
      </IonRouterOutlet>
      <IonTabBar></IonTabBar>
    </IonTabs>
  );
}

export default App;
