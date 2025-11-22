/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useJobs } from "../context/JobsContext";

/**
 * @description A form page that allows users to edit an existing job.
 * It fetches the initial job data using `useLoaderData` (via React Router).
 * Upon submission, it calls the **`updateJob` function from the `useJobs` context**
 * to update the data, displays a success toast, and navigates back to the job details page.
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

const EditJobPage = () => {
  /**
   * @hook useLoaderData
   * @description A hook from `react-router-dom` that provides access to the
   * data loaded by the loader function for the current route. In this case,
   * it provides the details of the job to be edited.
   * @returns {object} job - The job object fetched by the loader.
   */
  const job = useLoaderData() as Job;
  /**
   * @hook useParams
   * @description A hook from `react-router-dom` that returns an object of
   * key/value pairs of the dynamically matched parts of the URL. Here, it's
   * used to access the `id` of the job being edited.
   * @returns {object} params - An object containing URL parameters.
   * @returns {string} params.id - The ID of the job being edited.
   */
  const { id } = useParams();
  /**
   * @hook useJobs
   * @description Retrieves the centralized `updateJob` mutation function from the Jobs context.
   */
  const { updateJob } = useJobs();
  const [type, setType] = useState(job.type);
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);
  const [salary, setSalary] = useState(job.salary);
  const [location, setLocation] = useState(job.location);
  const [companyName, setCompanyName] = useState(job.company.name);
  const [companyDescription, setCompanyDescription] = useState(
    job.company.description
  );
  const [contactEmail, setContactEmail] = useState(job.company.contactEmail);
  const [contactPhone, setContactPhone] = useState(job.company.contactPhone);
  // to avoid double submittion
  const [isEditing, setIsEditing] = useState(false);

  /**
   * @hook useNavigate
   * @description A hook from `react-router-dom` that returns a function that
   * allows programmatic navigation.
   */
  const navigate = useNavigate();

  /**
   * @function submitForm
   * @description Handles the form submission for updating the job. Prevents
   * default submission, creates an `updatedJob` object with the form data and
   * the job ID, calls the **context's `updateJob` function**, displays a success toast,
   * and navigates the user to the job details page. The context handles the
   * list synchronization automatically.
   */
  const submitForm = async (e: React.FormEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    if (isEditing) return;
    setIsEditing(true);
    // Type Narrowing: Confirms 'id' is a 'string' before use, since useParams returns 'string | undefined'.
    if (!id) {
      toast.error("Error: Job ID is missing from the URL.");
      return;
    }
    let updatedJob = {
      id,
      title,
      type,
      location,
      description,
      salary,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail: contactEmail,
        contactPhone: contactPhone,
      },
    };
    try {
      await updateJob(updatedJob);
      toast.success("Job Updated successfully");
      return navigate(`/job/${id}`);
    } catch (error) {
      toast.error("Failed to update job.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-[#1A1B22] py-20">
      <div className="container m-auto max-w-2xl">
        <div
          className="
          bg-white dark:bg-[#1C1D24]
          border border-gray-200 dark:border-[#2E3040]
          rounded-xl shadow-sm
          px-6 py-8
          m-4 md:m-0
          transition-colors duration-300
        "
        >
          <form onSubmit={submitForm}>
            <h2 className="text-3xl font-semibold text-center mb-8">
              Update Job
            </h2>

            {/* Job Type */}
            <div className="mb-5">
              <label htmlFor="type" className="block font-medium mb-2">
                Job Type
              </label>
              <select
                id="type"
                required
                className="
                  border rounded-lg w-full py-2 px-3
                  focus:ring-indigo-500 focus:border-indigo-500
                  bg-white dark:bg-[#1C1D24]
                "
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Job Title */}
            <div className="mb-5">
              <label htmlFor="title" className="block font-medium mb-2">
                Job Listing Name
              </label>
              <input
                id="title"
                type="text"
                required
                placeholder="e.g. Frontend Developer"
                className="
                  border rounded-lg w-full py-2 px-3
                  focus:ring-indigo-500 focus:border-indigo-500
                  bg-white dark:bg-[#1C1D24]
                "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label htmlFor="description" className="block font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Add job duties, expectations, requirements..."
                className="
                  border rounded-lg w-full py-2 px-3
                  focus:ring-indigo-500 focus:border-indigo-500
                  bg-white dark:bg-[#1C1D24]
                "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                data-testid="job-description-textarea"
              />
            </div>

            {/* Salary */}
            <div className="mb-5">
              <label htmlFor="salary" className="block font-medium mb-2">
                Salary
              </label>
              <select
                id="salary"
                required
                className="
                  border rounded-lg w-full py-2 px-3
                  focus:ring-indigo-500 focus:border-indigo-500
                  bg-white dark:bg-[#1C1D24]
                "
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              >
                <option value="Under $50K">Under $50K</option>
                <option value="$50K - 60K">$50K - $60K</option>
                <option value="$60K - 70K">$60K - $70K</option>
                <option value="$70K - 80K">$70K - $80K</option>
                <option value="$80K - 90K">$80K - $90K</option>
                <option value="$90K - 100K">$90K - $100K</option>
                <option value="$100K - 125K">$100K - $125K</option>
                <option value="$125K - 150K">$125K - $150K</option>
                <option value="$150K - 175K">$150K - $175K</option>
                <option value="$175K - 200K">$175K - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

            {/* Location */}
            <div className="mb-5">
              <label htmlFor="location" className="block font-medium mb-2">
                Location
              </label>
              <input
                id="location"
                type="text"
                required
                className="
                  border rounded-lg w-full py-2 px-3
                  focus:ring-indigo-500 focus:border-indigo-500
                  bg-white dark:bg-[#1C1D24]
                "
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Company Info */}
            <h3 className="text-2xl mt-8 mb-4 font-semibold">Company Info</h3>

            <div className="mb-5">
              <label htmlFor="company" className="block font-medium mb-2">
                Company Name
              </label>
              <input
                id="company"
                type="text"
                className="
                  border rounded-lg w-full py-2 px-3
                  focus:ring-indigo-500 focus:border-indigo-500
                  bg-white dark:bg-[#1C1D24]
                "
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="company_description"
                className="block font-medium mb-2"
              >
                Company Description
              </label>
              <textarea
                id="company_description"
                rows={4}
                placeholder="What does your company do?"
                className="
                  border rounded-lg w-full py-2 px-3
                  focus:ring-indigo-500 focus:border-indigo-500
                  bg-white dark:bg-[#1C1D24]
                "
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                data-testid="company-description-textarea"
              />
            </div>

            {/* Contact Email */}
            <div className="mb-5">
              <label htmlFor="contact_email" className="block font-medium mb-2">
                Contact Email
              </label>
              <input
                id="contact_email"
                type="email"
                required
                placeholder="Email address for applicants"
                className="
                  border rounded-lg w-full py-2 px-3
                  focus:ring-indigo-500 focus:border-indigo-500
                  bg-white dark:bg-[#1C1D24]
                "
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            {/* Contact Phone */}
            <div className="mb-8">
              <label htmlFor="contact_phone" className="block font-medium mb-2">
                Contact Phone
              </label>
              <input
                id="contact_phone"
                type="tel"
                placeholder="Optional phone"
                className="
                  border rounded-lg w-full py-2 px-3
                  focus:ring-indigo-500 focus:border-indigo-500
                  bg-white dark:bg-[#1C1D24]
                "
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            <button
              className={`w-full py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 
          text-white font-bold transition-colors duration-200
          ${isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
              type="submit"
              disabled={isEditing}
            >
              {isEditing ? "Editing..." : "Edit Job"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditJobPage;
