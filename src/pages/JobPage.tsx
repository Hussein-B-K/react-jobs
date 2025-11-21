/* eslint-disable react/prop-types */
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { useParams, useLoaderData, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../services/supabase-client";
import { useJobs } from "../context/JobsContext";

/**
 * @function JobLoader
 * @description A loader function for the `/job/:id` route. It fetches the
 * details of a specific job from the API based on the `id` parameter in the URL.
 * @param {object} params - An object containing the route parameters.
 * @param {string} params.id - The ID of the job to fetch.
 */

interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  salary: string; 
  company: Company;
}

interface Company {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
}



const JobLoader = async ({ params }: {params: { id?: string}}): Promise<Job | null> => {
  const jobId = params.id;
  if (!jobId) {
    console.error("Job ID is missing in route parameters.");
    return null; 
  }

  const{data: fetchedData, error: fetchedError} = await supabase.from("jobs-dev").select().eq("id", jobId).single()
  
  if (fetchedError) {
    console.error("Supabase fetch error:", fetchedError);
    return null;
  } 
  return fetchedData as Job;
};

/**
 * @description Renders the detailed view of a single job listing.
 * It uses the data loaded by `useLoaderData` to display job details
 * and company information. It also provides a link to edit the job
 * and a button to delete the job, utilizing the `deleteJob` prop.
 * @prop {function} deleteJob - A callback function that is called with
 * the ID of the job to be deleted.
 */



const JobPage = () => {
  /**
   * @hook useParams
   * @description A hook from `react-router-dom` that returns an object of
   * key/value pairs of the dynamically matched parts of the URL. Here, it's
   * used to access the `id` of the current job.
   * @returns {object} params - An object containing URL parameters.
   * @returns {string} params.id - The ID of the current job.
   */

  const { id } = useParams();

  /**
   * @hook useLoaderData
   * @description A hook from `react-router-dom` that provides access to the
   * data loaded by the `JobLoader` function for this route.
   * @returns {object} job - The detailed job object.
   */
  const job = useLoaderData() as Job;
  const navigate = useNavigate();
  const {deleteJob} = useJobs();
  /**
   * @hook useJobs
   * @description Retrieves the centralized `deleteJob` mutation function from the Jobs context.
   */

  /**
   * @function handleDelete
   * @description Prompts the user for confirmation, then calls the context's
   * `deleteJob` function to remove the job from the API and instantly from the
   * global state. Displays a toast and navigates back to the job listings page.
   */
  const handleDelete =  async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
      if (!id) {
        return
      }
   await deleteJob(id);
    toast.success("Job deleted successfully");
    return navigate("/jobs");
  };
  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="
              text-indigo-500 hover:text-indigo-600 flex items-center
              dark:text-indigo-300 dark:hover:text-indigo-200
            "
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-950/20">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-6">

            {/* MAIN */}
            <main>
              <div
                className="
                  bg-white p-6 rounded-lg shadow-md text-center md:text-left
                  dark:bg-indigo-900/20 dark:border dark:border-indigo-800/40
                "
              >
                <div className="text-gray-500 mb-4 dark:text-indigo-300">
                  {job.type}
                </div>

                <h1 className="text-3xl font-bold mb-4 dark:text-indigo-100">
                  {job.title}
                </h1>

                <div
                  className="
                    text-gray-500 mb-4 flex align-middle justify-center md:justify-start
                    dark:text-indigo-300
                  "
                >
                  <FaMapMarker className="text-orange-700 mr-1 dark:text-orange-400" />
                  <p className="text-orange-700 dark:text-orange-400">
                    {job.location}
                  </p>
                </div>
              </div>

              <div
                className="
                  bg-white p-6 rounded-lg shadow-md mt-6
                  dark:bg-indigo-900/20 dark:border dark:border-indigo-800/40
                "
              >
                <h3 className="text-indigo-800 text-lg font-bold mb-6 dark:text-indigo-200">
                  Job Description
                </h3>

                <p className="mb-4 dark:text-indigo-100">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2 dark:text-indigo-200">
                  Salary
                </h3>

                <p className="mb-4 dark:text-indigo-100">{job.salary} / Year</p>
              </div>
            </main>

            {/* SIDEBAR */}
            <aside>
              <div
                className="
                  bg-white p-6 rounded-lg shadow-md
                  dark:bg-indigo-900/20 dark:border dark:border-indigo-800/40
                "
              >
                <h3 className="text-xl font-bold mb-6 dark:text-indigo-200">
                  Company Info
                </h3>

                <h2 className="text-2xl dark:text-indigo-100">
                  {job.company.name}
                </h2>

                <p className="my-2 dark:text-indigo-200/80">
                  {job.company.description}
                </p>

                <hr className="my-4 dark:border-indigo-800/60" />

                <h3 className="text-xl dark:text-indigo-200">Contact Email:</h3>

                <p
                  className="
                    my-2 bg-indigo-100 p-2 font-bold
                    dark:bg-indigo-800/40 dark:text-indigo-100
                  "
                >
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl dark:text-indigo-200">Contact Phone:</h3>

                <p
                  className="
                    my-2 bg-indigo-100 p-2 font-bold
                    dark:bg-indigo-800/40 dark:text-indigo-100
                  "
                >
                  {job.company.contactPhone}
                </p>
              </div>

              <div
                className="
                  bg-white p-6 rounded-lg shadow-md mt-6
                  dark:bg-indigo-900/20 dark:border dark:border-indigo-800/40
                "
              >
                <h3 className="text-xl font-bold mb-6 dark:text-indigo-200">
                  Manage Job
                </h3>

                <Link
                  to={`/edit-job/${job.id}`}
                  className="
                    bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full block
                    dark:bg-indigo-600 dark:hover:bg-indigo-500
                  "
                >
                  Edit Job
                </Link>

                <button
                  onClick={handleDelete}
                  className="
                    bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full cursor-pointer mt-4 block
                    dark:bg-red-600 dark:hover:bg-red-500
                  "
                >
                  Delete Job
                </button>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </>
  );
};

export { JobPage as default, JobLoader };
