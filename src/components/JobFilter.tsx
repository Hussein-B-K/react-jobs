import { useEffect, useState, useRef } from "react";
import { useJobs } from "../context/JobsContext";


/**
 * @description Renders a job search and type filter component.
 * the filtering functionality is from the global job state (`JobsContext`).
*/

const JobFilter = () => {
 const { searchTerm, setSearchTerm, filterType, setFilterType, originalJobs } =
    useJobs();
  // to generate the unique job type options
  const sourceJobs = originalJobs ?? [];
  const [jobTypes, setJobTypes] = useState<string[]>([]);

/**
   * @hook useEffect
   * @description Dynamically generates a unique list of job types from the master list (`originalJobs`)
   * whenever the master list is updated (e.g., on initial fetch or after a CRUD operation).
   */
  
  useEffect(() => {
    const types = Array.from(
      new Set(sourceJobs.map((j) => (j?.type ?? "").trim()))
    ).filter(Boolean);
    setJobTypes(types);
  }, [originalJobs]);

/**
   * @description Tracks if the search input container currently has keyboard focus. 
   * Used to trigger the search bar's visual expansion.
   */
  const [focused, setFocused] = useState(false);

  /**
   * @description Reference to the main component div, used for complex blur detection 
   * (e.g., checking if focus moved outside the entire search/filter group).
   */
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleFocus = () => setFocused(true);
  
  /**
   * @description Handles the blur event for the container. It uses `relatedTarget` to 
   * determine if focus moved outside the entire component (containerRef) or just 
   * shifted between the search input and the dropdown.
   */
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const related = e.relatedTarget as Node | null;
    if (!related || (containerRef.current && !containerRef.current.contains(related))) {
      setFocused(false);
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="flex items-center gap-3"
      aria-label="Job search and filter"
    >
      {/* Search input */}
      <div className="relative">
        <input
          type="search"
          placeholder={focused ? "title - company name - location" : ""}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`
            transition-all duration-300 ease-in-out
            h-10 rounded-full outline-none text-sm
            bg-white placeholder-gray-400
            dark:bg-[#13131F] dark:text-indigo-200 dark:placeholder-indigo-500/40
            border
            ${
              focused || searchTerm
                ? "w-64 pl-12 pr-4 shadow-md border-gray-300 dark:border-indigo-700/60 dark:shadow-indigo-900/40"
                : "w-10 pl-2 pr-2 cursor-pointer border-transparent dark:border-transparent"
            }
          `}
        />

        {/* Magnifier icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 pointer-events-none
             ${
              focused || searchTerm
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-gray-400 dark:text-indigo-700"
            }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Filter dropdown (fixed clipping issue) */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          focused || filterType !== "All"
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 -translate-x-3 scale-95 pointer-events-none"
        }`}
      >
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className={` ml-1 h-10 rounded-full px-3 text-sm outline-none
            transition-all duration-300 bg-white border
            dark:bg-[#13131F] dark:text-indigo-200
            dark:border-indigo-700/60
            ${
              focused
                ? "shadow-md border-gray-300 dark:shadow-indigo-900/40"
                : "border-gray-200 dark:border-indigo-800"
            }
          `}
        >
          <option value="All">All</option>
          {jobTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default JobFilter;