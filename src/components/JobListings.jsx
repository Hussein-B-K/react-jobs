import JobListing from "./JobListing";
import Spinner from "./Spinner";
import useFetch from "../Custom_Hooks/useFetch";

/**
 * @description Fetches and displays a list of recent job listings.
 * It uses the `useFetch` custom hook to retrieve job data from the API
 * and renders each job using the `JobListing` component. Displays a
 * `Spinner` while the data is loading.
 */

const JobListings = () => {
  const { data: jobs, loading } = useFetch("/api/jobs?_limit=3");
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Recent Jobs
        </h2>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs &&
              jobs.map((job) => (job = <JobListing key={job.id} job={job} />))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
