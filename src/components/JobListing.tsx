/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";

/**
 * @description Renders a single job listing with an option
 * to show or hide the full description. Provides a link to view the full job details.
 * @prop {object} job - An object containing the details of the job listing.
 * @prop {string} job.id - The unique identifier of the job listing. Used for the "Read More" link.
 * @prop {string} job.type - The type of the job (e.g., "Full-time", "Part-time").
 * @prop {string} job.title - The title of the job.
 * @prop {string} job.description - The full description of the job.
 * @prop {string} job.salary - The annual salary offered for the job.
 * @prop {string} job.location - The location of the job.
 */

export interface JobDetails {
    id: string,
    type: string,
    title: string,
    description: string,
    salary: string,
    location: string,

}
const JobListing = ({ job }: {job: JobDetails}) => {
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
 
  return (
    <div className=" bg-white 
        dark:bg-[#1C1D24]
        border 
        border-gray-200 
        dark:border-[#2E3040]
        shadow-sm 
        rounded-xl 
        transition-colors 
        duration-300">
      <div className="p-4">
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-1">{job.type}</p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
        </div>
        <div className="mb-5 text-gray-700 dark:text-gray-300">
          {showFullDescription === false ? (
            <>
              {job.description.slice(0, 90)}
              {job.description.length > 90 && (
                <button
                  className="ml-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  onClick={() => setShowFullDescription((s) => !s)}
                >
                  {" "}
                  ...show more
                </button>
              )}
            </>
          ) : (
            <>
              {job.description}
              <button
                className=" ml-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                onClick={() => setShowFullDescription((s) => !s)}
              >
                {" "}
                ...show less
              </button>
            </>
          )}
        </div>
        <h3 className="text-indigo-600 dark:text-indigo-400 font-semibold mb-3">{job.salary} / Year</h3>

        <div className="border border-gray-100 dark:border-[#2E3040] mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 dark:text-orange-400">
            <FaMapMarker className="inline text-lg mb-1 mr" />
            {job.location}
          </div>
          <Link
            to={`/job/${job.id}`}
            className="h-[36px]
              bg-indigo-600 
              hover:bg-indigo-700 
              text-white 
              px-4 
              py-2 
              rounded-lg 
              text-center 
              text-sm
              transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};
export default JobListing;
