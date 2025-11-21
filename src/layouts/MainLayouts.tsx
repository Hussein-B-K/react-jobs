import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

/**
 * @description Provides the main layout structure for the application.
 * It renders the `Navbar` component , the content of the
 * current route via the `Outlet` component, the `Footer` component, and the `ToastContainer`
 * for displaying notifications.
 * note/ the ToastContainer`s position does not  matter since it`s positioned absolute by default
 */
const MainLayouts = () => {
  return (
    <>
    <div className="min-h-screen bg-blue-50 dark:bg-drift-bg text-gray-900 dark:text-drift-text transition-colors">
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
    </>
  );
};

export default MainLayouts;
