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
import { addJob } from "./services/api";
import { deleteJob } from "./services/api";
import { updateJob } from "./services/api";

/**
 * @description The main entry point of the React application. It configures
 * the application's routing using `react-router-dom` and renders the
 * `RouterProvider` to make the routing available to all child components.
 */
function App() {
  /**
   * @constant route
   * @description Configures the application's routes using `createBrowserRouter`.
   * It defines a hierarchical route structure with a root layout (`MainLayouts`)
   * and nested routes for different pages of the application. Data loaders
   * (JobLoader) and action functions (updateJob, deleteJob, addJob)
   * are associated with specific routes to handle data fetching and form submissions.
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
         * @prop {function} updateJobSubmit - Function to handle the submission
         * of updated job data to the server.
         * @loader JobLoader - Fetches the data for the job being edited based
         * on the `id` parameter in the URL.
         */}
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
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
          element={<JobPage deleteJob={deleteJob} />}
          loader={JobLoader}
        />
        {/**
         * @prop {function} addJobSubmit - Function to handle the submission of
         * new job data to the server.
         */}
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
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
      {/**
       * @description A component from `react-router-dom` that provides the
       * configured router to the application. All routing-aware components
       * within its tree can access the router's functionality.
       * @prop {object} router - The router instance (`route`) created using
       * `createBrowserRouter`.
       */}
      <RouterProvider router={route} />
    </>
  );
}

export default App;
