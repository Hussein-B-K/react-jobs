import JobListing from "../components/JobListing";
import Spinner from "../components/Spinner";
import useFetch from "../Custom_Hooks/useFetch";
import type { JobDetails } from "../components/JobListing"; 

/**
 * @description Fetches and displays a comprehensive list of job listings.
 * It utilizes the `useFetch` custom hook to retrieve job data from the API
 * and renders each job using the `JobListing` component. A `Spinner` is
 * displayed while the job data is being loaded.
 */
const JobsPage = () => {
  const { data: jobs, loading } = useFetch<JobDetails[] | null>("jobs");

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Browse Jobs
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs && jobs.map((job) => <JobListing key={job.id} job={job} />)}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobsPage;
