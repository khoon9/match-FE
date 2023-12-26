import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { setupIonicReact } from "@ionic/react";

// TypeScript에 Window 인터페이스에 dataLayer 속성 추가
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
  }
}

// Google Analytics 초기화 함수
const initializeGoogleAnalytics = () => {
  // 환경변수에서 GA 추적 ID를 가져옵니다.
  const gaTrackingId = import.meta.env.VITE_GA_TRACKING_ID;

  // GA 추적 ID가 존재하는지 확인
  if (!gaTrackingId) {
    console.error("Google Analytics tracking ID not found");
    return;
  }

  // Google Analytics 스크립트를 동적으로 추가
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`;
  document.head.appendChild(script);

  // dataLayer 초기화
  window.dataLayer = window.dataLayer || [];

  // gtag 함수 정의
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag = (...args: any[]) => {
    window.dataLayer.push(args);
  };

  // Google Analytics 설정
  gtag("js", new Date());
  gtag("config", gaTrackingId);
};

// IonicReact 초기화
setupIonicReact();

// Google Analytics 초기화
initializeGoogleAnalytics();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <IonApp>
    <IonReactRouter>
      <App />
    </IonReactRouter>
  </IonApp>
);
