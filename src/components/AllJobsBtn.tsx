import { Link } from "react-router-dom";

/**
 * @description Renders a button that links to the full job listings page.
 */

const AllJobsBtn = () => {
  return (
    <section className="m-auto max-w-lg my-10 px-6">
      <Link
        to="/jobs"
        className=" block text-center py-4 px-6 rounded-xl font-semibold
          transition-all duration-300

          bg-black text-white hover:bg-gray-800
          dark:bg-indigo-500 dark:text-indigo-900
          dark:hover:bg-indigo-400
          shadow-md dark:shadow-indigo-900/50"
      >
        View All Jobs
      </Link>
    </section>
  );
};

export default AllJobsBtn;
