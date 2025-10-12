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

interface JobDetails {
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
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{job.type}</div>
          <h3 className="text-xl font-bold">{job.title}</h3>
        </div>
        <div className="mb-5 inline">
          {showFullDescription === false ? (
            <>
              {job.description.slice(0, 90)}
              {job.description.length > 90 && (
                <button
                  className="cursor-pointer text-indigo-500 hover:text-indigo-500 "
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
                className=" cursor-pointer text-indigo-500 hover:text-indigo-500"
                onClick={() => setShowFullDescription((s) => !s)}
              >
                {" "}
                ...show less
              </button>
            </>
          )}
        </div>
        <h3 className="text-indigo-500 mb-2">{job.salary} / Year</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapMarker className="inline text-lg mb-1 mr" />
            {job.location}
          </div>
          <Link
            to={`/job/${job.id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};
export default JobListing;
