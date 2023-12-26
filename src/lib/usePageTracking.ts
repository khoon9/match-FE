import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPage = location.pathname + location.search;
    // Google Analytics 페이지 뷰 이벤트를 보내기

    window.dataLayer.push("config", "GA_TRACKING_ID", {
      page_path: currentPage,
    });
  }, [location]);
};

export default usePageTracking;
