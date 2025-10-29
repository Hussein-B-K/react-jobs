/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * @description A form page that allows users to edit an existing job listing.
 * It fetches the job data using `useLoaderData`.
 * Upon submission, it calls the `updateJobSubmit` prop to update
 * the job data, displays a success toast, and navigates to the job details page.
 * @prop {function} updateJobSubmit - A callback function that is called with
 * the updated job object when the form is submitted.
 */


interface Job {
  id: string,
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

interface UpdateJob {
  updateJobSubmit: (updateJobSubmit: Job) => Promise<Job>;
}

const EditJobPage = ({ updateJobSubmit }: UpdateJob) => {
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
   * the job ID, calls the `updateJobSubmit` prop, displays a success toast,
   * and navigates the user to the job details page.
   */
  
  const submitForm = async (e: React.FormEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    // Type Narrowing: Confirms 'id' is a 'string' before use, since useParams returns 'string | undefined'.
    if (!id) {
      toast.error("Error: Job ID is missing from the URL.");
      return
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
        await updateJobSubmit(updatedJob);
        toast.success("Job Updated successfully");
        return navigate(`/job/${id}`);
    } catch (error) {
        toast.error("Failed to update job.");
    }
  };

  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Update Job
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={type}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)} 
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Job Listing Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Beautiful Apartment In Miami"
                  required
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="Add any job duties, expectations, requirements, etc"
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  data-testid="job-description-textarea"
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="salary"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Salary
                </label>
                <select
                  id="salary"
                  name="salary"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={salary}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSalary(e.target.value)}
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

              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Company Location"
                  required
                  value={location}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                />
              </div>

              <h3 className="text-2xl mb-5">Company Info</h3>

              <div className="mb-4">
                <label
                  htmlFor="company"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="company_description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company Description
                </label>
                <textarea
                  id="company_description"
                  name="company_description"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="What does your company do?"
                  value={companyDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCompanyDescription(e.target.value)}
                  data-testid="company-description-textarea"
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contact_email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Email address for applicants"
                  required
                  value={contactEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contact_phone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Optional phone for applicants"
                  value={contactPhone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactPhone(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full cursor-pointer focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditJobPage;
