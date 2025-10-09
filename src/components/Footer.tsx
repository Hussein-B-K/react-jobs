const Footer = () => {
  return (
    <>
      <footer className="bg-indigo-700 text-white text-center  pt-[2rem] pb-[3.7rem]">
        <p className="sm:mt-[0.4rem] ">
          &copy; {new Date().getFullYear()} Created By{" "}
          <a
            href="https://github.com/Hussein-B-K"
            target="_blank"
            className="font-bold"
          >
            Hussein-B-K
          </a>{" "}
        </p>
        <p className="sm:mt-[1.1rem]">
          Inspired By <span className="font-bold">Brad</span> from{" "}
          <a
            href="https://www.traversymedia.com/"
            target="_blank"
            className="font-bold"
          >
            Traversy Media
          </a>
        </p>
      </footer>
    </>
  );
};

export default Footer;
