import ReactGA from "react-ga4";

export const sendVisitorEventToGa = (interactionType: string) => {
  // GA4 이벤트 전송
  ReactGA.event({
    category: "User Interaction",
    action: "Visitor",
    label: interactionType,
  });
};
