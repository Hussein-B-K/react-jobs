import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

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
      ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                React Jobs
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
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
