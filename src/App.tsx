import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import HomePage from "./pages/HomePage";
import Jobs from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { JobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import { JobsProvider } from "./context/JobsContext";

/**
 * @description The main entry point of the React application. It configures
 * the application's routing using `react-router-dom` and renders the
 * `RouterProvider` wrapped within the `JobsProvider` to make centralized
 * job state and routing available to all child components.
 */
function App() {
/**
   * @constant route
   * @description Configures the application's routes using `createBrowserRouter`.
   * It defines a hierarchical route structure with a root layout (`MainLayouts`)
   * and nested routes for different pages of the application. Data loaders
   * (`JobLoader`) handle job-specific data fetching for detail and edit pages.
   * All CRUD actions are now managed via the `useJobs` context within the page components.
   */
  const route = createBrowserRouter(
    /**
     * @function createRoutesFromElements
     * @description Converts JSX route definitions into JavaScript route objects
     * that the `createBrowserRouter` can use to manage navigation..
     */
    createRoutesFromElements(
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<HomePage />} />

        <Route path="/jobs" element={<Jobs />} />
        {/**
         * @route /edit-job/:id
         * @loader JobLoader - Fetches the data for the job being edited based
         * on the `id` parameter in the URL.
         */}
        <Route
          path="/edit-job/:id"
          element={<EditJobPage />}
          loader={JobLoader}
        />
        {/**
         * @prop {function} deleteJob - Function to handle the deletion of the
         * current job listing.
         * @loader JobLoader - Fetches the data for the displayed job based on
         * the `id` parameter in the URL.
         */}
        <Route
          path="/job/:id"
          element={<JobPage />}
          loader={JobLoader}
        />
        <Route path="/add-job" element={<AddJobPage />} />
        {/**
       NotFoundPage
         * @description Displays a 404 error message for any unmatched routes.
         * @route *
         */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <>
       <JobsProvider>
        {/**
         * @component RouterProvider
         * @description Provides the configured router (`route`) to the application,
         * enabling navigation and loader functionality.
         */}
      <RouterProvider router={route} />
       </JobsProvider>
    </>
  );
}

export default App;
