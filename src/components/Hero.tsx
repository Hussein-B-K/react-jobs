/**
 * @description Renders the main hero section of the home page.
 */
const Hero = () => {
  return (
    <section className="bg-indigo-700 
        dark:bg-gradient-to-b dark:from-[#0A0A0F] dark:to-[#11111A]
        py-20 mb-4
        transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="  text-center 
            transition-all duration-500
            opacity-100
            animate-fadeIn
          ">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold 
              text-white 
              dark:text-indigo-300
              drop-shadow-xl
              transition-colors duration-300">
            Become a React Dev
          </h1>
          <p className="  my-4 text-xl 
              text-indigo-100 
              dark:text-indigo-400
              transition-colors duration-300">
            Find the React job that fits your skills and needs
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
