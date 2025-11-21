const Footer = () => {
  return (
    <>
      <footer className="bg-indigo-700 text-white text-center
        dark:bg-gradient-to-b dark:from-[#0a0a0f] dark:to-[#11111A]
        pt-[2rem] pb-[3.7rem]
        transition-colors duration-300">
        <p className="sm:mt-[0.4rem] text-indigo-100 dark:text-indigo-300 ">
          &copy; {new Date().getFullYear()} Created By{" "}
          <a
            href="https://github.com/Hussein-B-K"
            target="_blank"
            className="font-bold underline-offset-2
            hover:underline 
            hover:text-white
            dark:hover:text-indigo-400
            transition-colors"
          >
            Hussein-B-K
          </a>{" "}
        </p>
        <p className="sm:mt-[1.1rem] text-indigo-100 dark:text-indigo-300">
          Inspired By <span className="font-bold text-white dark:text-indigo-400">Brad</span> from{" "}
          <a
            href="https://www.traversymedia.com/"
            target="_blank"
            className="font-bold underline-offset-2
            hover:underline 
            hover:text-white
            dark:hover:text-indigo-400
            transition-colors"
          >
            Traversy Media
          </a>
        </p>
      </footer>
    </>
  );
};

export default Footer;
