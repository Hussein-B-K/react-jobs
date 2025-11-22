import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useJobs } from "../context/JobsContext";

/**
 * @description A form page that allows users to add a new job listing.
 * It manages input fields for job details and company information.
 * Job submission is handled by the `addJob` function from the centralized `useJobs` context.
 * Upon successful submission, it displays a success toast and navigates to the job list page.
 */



interface Job {
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


const AddJobPage = () => {
  const [type, setType] = useState("Full-Time");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("Under $50K");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  // to avoid double submittion
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { addJob } = useJobs();
  const submitForm = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if(isSubmitting) return;
    setIsSubmitting(true);
    let newJob: Job = {
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

    await addJob(newJob);
    toast.success("Job Added successfully");
     navigate("/jobs");
  };
  return (
    <>
      <section className="bg-indigo-50 
        dark:bg-[#111217]
        min-h-screen
        transition-colors
        duration-300">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white 
            dark:bg-[#1C1D24]
            px-6 
            py-8 
            shadow-md 
            rounded-xl 
            border 
            border-gray-200 
            dark:border-[#2E3040]
            transition-colors 
            duration-300
            m-4 
            md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl 
                text-center 
                font-semibold 
                mb-8
                text-indigo-700
                dark:text-indigo-400">
                Add Job
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
                  className="w-full 
                  py-2 
                  px-3 
                  rounded-lg 
                  border 
                  bg-white 
                  dark:bg-[#1C1D24]
                  border-gray-300 
                  dark:border-[#2E3040]
                  transition-colors 
                  duration-300"
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
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="title"
                >
                  Job Listing Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full 
                  py-2 
                  px-3 
                  rounded-lg 
                  border 
                  bg-white 
                  dark:bg-[#1C1D24]
                  border-gray-300 
                  dark:border-[#2E3040]
                  transition-colors 
                  duration-300"
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
                  Job Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full 
                  py-2 
                  px-3 
                  rounded-lg 
                  border 
                  bg-white 
                  dark:bg-[#1C1D24]
                  border-gray-300 
                  dark:border-[#2E3040]
                  transition-colors 
                  duration-300"
                  rows="4"
                  placeholder="Add any job duties, expectations, requirements, etc"
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
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
                  className="w-full 
                  py-2 
                  px-3 
                  rounded-lg 
                  border 
                  bg-white 
                  dark:bg-[#1C1D24]
                  border-gray-300 
                  dark:border-[#2E3040]
                  transition-colors 
                  duration-300"
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
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="w-full 
                  py-2 
                  px-3 
                  rounded-lg 
                  border 
                  bg-white 
                  dark:bg-[#1C1D24]
                  border-gray-300 
                  dark:border-[#2E3040]
                  transition-colors 
                  duration-300"
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
                  className="w-full 
                  py-2 
                  px-3 
                  rounded-lg 
                  border 
                  bg-white 
                  dark:bg-[#1C1D24]
                  border-gray-300 
                  dark:border-[#2E3040]
                  transition-colors 
                  duration-300"
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
                  Company Description{" "}
                </label>
                <textarea
                  id="company_description"
                  name="company_description"
                  className="w-full 
                  py-2 
                  px-3 
                  rounded-lg 
                  border 
                  bg-white 
                  dark:bg-[#1C1D24]
                  border-gray-300 
                  dark:border-[#2E3040]
                  transition-colors 
                  duration-300"
                  rows="4"
                  placeholder="What does your company do?"
                  value={companyDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCompanyDescription(e.target.value)}
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
                  className="w-full 
                  py-2 
                  px-3 
                  rounded-lg 
                  border 
                  bg-white 
                  dark:bg-[#1C1D24]
                  border-gray-300 
                  dark:border-[#2E3040]
                  transition-colors 
                  duration-300"
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
                  className="w-full 
                  py-2 
                  px-3 
                  rounded-lg 
                  border 
                  bg-white 
                  dark:bg-[#1C1D24]
                  border-gray-300 
                  dark:border-[#2E3040]
                  transition-colors 
                  duration-300"
                  placeholder="Optional phone for applicants"
                  value={contactPhone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactPhone(e.target.value)}
                />
              </div>

              <div>
                <button
                  className={`w-full py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 
          text-white font-bold transition-colors duration-200
          ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  type="submit"
                  disabled={isSubmitting}
                  
                >
                 {isSubmitting ? "Adding..." : "Add Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddJobPage;
