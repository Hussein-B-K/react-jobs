import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import JobFilter from "./JobFilter";
import ThemeToggle from "./ThemeToggle";
/**
 * @description Renders the main navigation bar for the website.
 * It includes the logo, website title, and navigation links.
 */

const Navbar = () => {
  /**
   * @function activatedLink
   * @description Determines the CSS class to apply to a NavLink based on whether it's currently active.
   * @param {object} params - An object containing information about the link's state.
   * @param {boolean} params.isActive - A boolean indicating if the NavLink is currently active.
   * @returns {string} - The CSS class string to apply to the NavLink.
   */

  interface ActiveLink {
    isActive: boolean
  }
  const activatedLink = ({ isActive }: ActiveLink): string =>
    isActive
      ? // Active link
        "px-3 py-2 rounded-md font-medium transition-all duration-300 " +
        "bg-black text-white dark:bg-indigo-400 dark:text-indigo-900"
      : // Inactive link
        "px-3 py-2 rounded-md font-medium transition-all duration-300 " +
        "text-white hover:bg-black/20 hover:text-white " +
        "dark:text-indigo-100 dark:hover:bg-indigo-300/20 dark:hover:text-indigo-200";

      const location = useLocation();

  return (
    <nav className="  bg-indigo-700 border-b border-indigo-500 
      dark:bg-indigo-950 dark:border-indigo-800 
      transition-colors duration-300
    ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between relative">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2 dark:text-indigo-200 transition-colors">
                React Jobs
              </span>
            </NavLink>
            <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 ">
            {/* Show the filter ONLY on the jobsPage */}
            {location.pathname === '/jobs' && (
              <div className="hidden md:flex flex-grow justify-center mx-10">
                <JobFilter/>
              </div>
            )}
            </div>
            <div className="md:ml-auto">
              <div className="flex space-x-2 items-center">
                <ThemeToggle/>
                <NavLink to="/" className={activatedLink}>
                  Home
                </NavLink>
                <NavLink to="/jobs" className={activatedLink}>
                  Jobs
                </NavLink>
                <NavLink to="/add-job" className={activatedLink}>
                  Add Job
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;