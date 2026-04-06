import { useNavigate, useLocation } from "react-router-dom";

/**
 * Smart navigation hook for handling cross-page navigation
 * - Handles scroll-to-section on home page
 * - Navigates between different pages
 * - Manages scroll behavior when returning to home
 */
export const useSmartNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (navItem) => {
    // If item has a route (like "/services")
    if (navItem.route) {
      navigate(navItem.route);
      return;
    }

    // If item has a scroll target (like "hero", "workflow", "contact")
    if (navItem.target) {
      // If already on home page, just scroll
      if (location.pathname === "/") {
        setTimeout(() => {
          const element = document.getElementById(navItem.target);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else {
        // If on different page, navigate to home first, then scroll
        navigate("/", { state: { scrollTarget: navItem.target } });
      }
      return;
    }
  };

  return { handleNavigation, currentPath: location.pathname };
};
