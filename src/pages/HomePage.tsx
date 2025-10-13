import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import JobListings from "../components/JobListings";
import AllJobsBtn from "../components/AllJobsBtn";

/**
 * @description Renders the main landing page of the application.
 * which consists of the `Hero` section, `HomeCards`
 * a section of recent `JobListings`, and a button (`AllJobsBtn`) to view all jobs.
 */

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <JobListings />
      <AllJobsBtn />
    </>
  );
};

export default HomePage;
