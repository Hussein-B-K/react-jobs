import { Link } from "react-router-dom";
import Card from "./Card";

/**
 * @description Renders two prominent cards on the home page, one for developers
 * to browse jobs and another for employers to add job listings. It utilizes the
 * `Card` component for styling and `Link` for navigation.
 */

const HomeCards = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          {/**
           * @component Card
           * @description A reusable container component for displaying content with optional background styling.
           * @prop {React.ReactNode} children - The content to be rendered within the Card.
           */}
          <Card>
            <h2 className="text-2xl font-bold">For Developers</h2>
            <p className="mt-2 mb-4">
              Browse our React jobs and start your career today
            </p>
            <Link
              to="/jobs"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Browse Jobs
            </Link>
          </Card>

          {/**
           * @prop {string} [bg="bg-indigo-100"] - Optional CSS class to apply background styling.
           */}

          <Card bg="bg-indigo-100">
            <h2 className="text-2xl font-bold">For Employers</h2>
            <p className="mt-2 mb-4">
              List your job to find the perfect developer for the role
            </p>
            <Link
              to="/add-job"
              className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
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
