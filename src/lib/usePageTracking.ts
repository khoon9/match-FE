import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// TypeScript에 Window 인터페이스에 dataLayer 속성 추가
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
  }
}

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPage = location.pathname + location.search;
    // Google Analytics 페이지 뷰 이벤트를 보내기

    window.dataLayer.push("config", import.meta.env.VITE_GA_TRACKING_ID, {
      page_path: currentPage,
    });
    // window.dataLayer.push("config", "GA_TRACKING_ID", {
    //   page_path: currentPage,
    // });
  }, [location]);
};

export default usePageTracking;
