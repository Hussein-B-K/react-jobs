import { Link } from "react-router-dom";
import Card from "./Card";

/**
 * @description Renders two prominent cards on the home page, one for developers
 * to browse jobs and another for employers to add job listings. It utilizes the
 * `Card` component for styling and `Link` for navigation.
 */

const HomeCards = () => {
  return (
    <section className="py-4
        bg-white dark:bg-[#0B0B11]
        transition-colors duration-300">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          {/**
           * @component Card
           * @description A reusable container component for displaying content with optional background styling.
           * @prop {React.ReactNode} children - The content to be rendered within the Card.
           */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-indigo-400 transition-colors">For Developers</h2>
            <p className="mt-2 mb-4 text-gray-700 dark:text-indigo-300 transition-colors">
              Browse our React jobs and start your career today
            </p>
            <Link
              to="/jobs"
              className="inline-block rounded-lg px-4 py-2 font-medium
                bg-black text-white 
                hover:bg-gray-800
                dark:bg-indigo-600 dark:hover:bg-indigo-500
                dark:text-[#E3E7FF]
                transition-colors duration-300"
            >
              Browse Jobs
            </Link>
          </Card>

          {/**
           * @prop {string} [bg="bg-indigo-100"] - Optional CSS class to apply background styling.
           */}

          <Card bg="bg-indigo-100 
              dark:bg-gradient-to-br dark:from-[#13131F] dark:to-[#1C1C2C]
              transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-indigo-300 transition-colors">For Employers</h2>
            <p className="mt-2 mb-4 text-gray-700 dark:text-indigo-400 transition-colors">
              List your job to find the perfect developer for the role
            </p>
            <Link
              to="/add-job"
              className="inline-block rounded-lg px-4 py-2 font-medium
                bg-indigo-500 text-white 
                hover:bg-indigo-600
                dark:bg-indigo-500 dark:hover:bg-indigo-400
                dark:text-[#E3E7FF]
                transition-colors duration-300"
            >
              Add Job
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
