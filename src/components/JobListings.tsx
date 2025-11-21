import JobListing from "./JobListing";
import Spinner from "./Spinner";
import useFetch from "../Custom_Hooks/useFetch";
import type { JobDetails } from "./JobListing"; 
/**
 * @description Fetches and displays a list of recent job listings.
 * It uses the `useFetch` custom hook to retrieve job data from the API
 * and renders each job using the `JobListing` component. Displays a
 * `Spinner` while the data is loading.
 */

const JobListings = () => {
  const { data: jobs, loading } = useFetch<JobDetails[] | null>("jobs", 3);
  return (
    <section className=" bg-indigo-50 
        dark:bg-[#111217]
        px-4 
        py-12 
        transition-colors
        duration-300">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl 
            font-bold 
            text-indigo-700 
            dark:text-indigo-400 
            mb-8 
            text-center">
          Recent Jobs
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.isArray(jobs) &&
              jobs.map(
                (
                  job // <-- directly return the JSX
                ) => (
                  <JobListing
                    data-testid={`job-listing-${job.id}`} // This is fine here
                    key={job.id}
                    job={job}
                  />
                )
              )}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;