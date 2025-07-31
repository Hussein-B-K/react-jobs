/* eslint-disable react/prop-types */
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { useParams, useLoaderData, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
/**
 * @function JobLoader
 * @description A loader function for the `/job/:id` route. It fetches the
 * details of a specific job from the API based on the `id` parameter in the URL.
 * @param {object} params - An object containing the route parameters.
 * @param {string} params.id - The ID of the job to fetch.
 */
const JobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data;
};

/**
 * @description Renders the detailed view of a single job listing.
 * It uses the data loaded by `useLoaderData` to display job details
 * and company information. It also provides a link to edit the job
 * and a button to delete the job, utilizing the `deleteJob` prop.
 * @prop {function} deleteJob - A callback function that is called with
 * the ID of the job to be deleted.
 */

const JobPage = ({ deleteJob }) => {
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
  const job = useLoaderData();
  const navigate = useNavigate();
  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    deleteJob(id);
    toast.success("Job deleted successfully");
    return navigate("/jobs");
  };
  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-orange-700 mr-1" />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">{job.salary} / Year</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">{job.company.name}</h2>

                <p className="my-2">{job.company.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {" "}
                  {job.company.contactPhone}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full cursor-pointer focus:outline-none focus:shadow-outline mt-4 block"
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

// eslint-disable-next-line react-refresh/only-export-components
export { JobPage as default, JobLoader };
