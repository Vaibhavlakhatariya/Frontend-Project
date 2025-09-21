import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../ThemeContext/ThemeContextProvider";
import { Link } from "react-router-dom";

const Main3 = () => {
  const {
    darkMode, // contains primaryClr, textClr etc.
  } = useContext(ThemeContext);

  const [content, setContent] = useState({ title: "", description: "" });
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://t3-reva.t3planet.de/elements/infographic-elements/pricing-plans"
    )
      .then((res) => res.json())
      .then((data) => {
        function findById(obj, id) {
          let result = null;
          function search(o) {
            if (typeof o !== "object" || o === null) return;
            for (let key in o) {
              if (key === "id" && o[key] === id) {
                result = o;
                return;
              }
              if (typeof o[key] === "object") {
                search(o[key]);
                if (result) return;
              }
            }
          }
          search(obj);
          return result;
        }

        const contentData = findById(data, 1466);

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = contentData?.content?.bodytext || "";

        const h2 = tempDiv.querySelector("h2")?.innerText || "";
        const p = tempDiv.querySelector("p")?.innerText || "";

        setContent({ title: h2, description: p });
        setBreadcrumbs(data?.breadcrumbs || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-[440px] bg-gray-100 flex justify-center items-center"></div>
    );
  }

  return (
    <div
      className={`min-h-[440px] w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 text-center ${
        darkMode === "dark" ? "bg-[#b0eeef]" : "bg-[var(--grayClr)]"
      }`}
    >
      {/* Heading */}
      <h1
        className={`text-[28px] sm:text-[32px] md:text-[39px]  font-extrabold leading-tight ${
          darkMode === "dark" ? "text-white" : "text-[var(--secondryClr)]"
        }`}
      >
        {content.title}
      </h1>

      {/* Description */}
      <p
        className={` leading-relaxed tracking-wide mx-auto max-w-[740px] text-[15px] sm:text-[16px] md:text-[18px] mt-3 sm:mt-4 px-3 ${
          darkMode === "dark" ? "text-white" : "text-[var(--textClr)]"
        }`}
      >
        {content.description}
      </p>

      {/* Breadcrumbs */}
      <div
        className={`flex flex-wrap justify-center gap-1 text-sm sm:text-base cursor-pointer mt-6 sm:mt-8 md:mt-11 ${
          darkMode === "dark" ? "text-white" : "text-[var(--textClr)]"
        }`}
      >
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <Link to={crumb.link} className="hover:text-blue-400">
              {crumb.title}
            </Link>
            {index < breadcrumbs.length - 1 && <span>/</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Main3;
