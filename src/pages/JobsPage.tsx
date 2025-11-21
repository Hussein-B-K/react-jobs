import JobListing from "../components/JobListing";
import Spinner from "../components/Spinner";
import { useJobs } from "../context/JobsContext";

/**
 * @description Fetches and displays a comprehensive list of job listings.
 * It utilizes the `useFetch` custom hook to retrieve job data from the API
 * and renders each job using the `JobListing` component. A `Spinner` is
 * displayed while the job data is being loaded.
 */
const JobsPage = () => {
  /**
   * @hook useJobs
   * @description Retrieves the centralized list of jobs (`jobs`) and the loading state (`loading`)
   * from the Jobs context (the Single Source of Truth).
   */
  const { jobs, loading } = useJobs();

  return (
    <section className="bg-blue-50 dark:bg-[#121317] transition-colors duration-300">
      <div className="container-xl lg:container m-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-indigo-500 dark:text-[#7476F0] mb-6 text-center transition-colors duration-300">
          Browse Jobs
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs?.map((job) => <JobListing key={job.id} job={job} />)}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobsPage;
