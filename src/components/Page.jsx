import { useEffect } from "react";
import Pagination from "./Pagination.jsx";
import Footer from "./Footer.jsx";

const Page = ({ title, meta, children }) => {
  const id = title.toLowerCase().replace(/ /g, "-");

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  }, [title]);

  return (
    <div className="w-full px-2 xl:pl-6 py-6">
      <h1
        id={id}
        className="text-4xl font-bold text-gray-700 dark:text-white mb-5"
      >
        {title}
      </h1>
      <p className="text-gray-500 dark:text-zinc-400 text-xl mb-5">{meta}</p>
      {children}
      <Pagination />
      <Footer />
    </div>
  );
};

export default Page;
