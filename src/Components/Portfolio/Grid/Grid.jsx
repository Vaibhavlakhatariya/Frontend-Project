import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../ThemeContext/ThemeContextProvider";
// import { lighten } from "polished";
import { Link } from "react-router-dom";

const Grid = () => {
  const { darkMode } = useContext(ThemeContext); // ✅ use ThemeBar context

  const [content, setContent] = useState({ title: "", description: "" });
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/portfolio/portfolio-grid")
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

        const contentBlock = findById(data, 751);

        if (contentBlock) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = contentBlock.content?.bodytext || "";

          const h1 = tempDiv.querySelector("h1")?.innerText || "";
          const p = tempDiv.querySelector("p")?.innerText || "";

          setContent({ title: h1, description: p });
        }

        setBreadcrumbs(data?.breadcrumbs || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching video modal data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-[440px] bg-gray-100 flex justify-center items-center text-gray-500" />
    );
  }

  return (
    <div
    
      className="min-h-[360px] w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 text-center"
    >
      {/* 🔹 Title */}
      <h1
        className="text-[28px] sm:text-[32px] md:text-[39px] font-extrabold leading-tight text-[var(--secondryClr)]"
      >
        {content.title || "Grid portfolio layouts"}
      </h1>

      {/* 🔹 Description */}
      <p
        className="leading-relaxed tracking-wide mx-auto max-w-[740px] text-[15px] sm:text-[16px] md:text-[18px] mt-3 sm:mt-4 px-3 text-[var(--textClr)]"
      >
        {content.description}
      </p>

      {/* 🔹 Breadcrumbs */}
      <div
        className="flex flex-wrap justify-center gap-1 text-sm sm:text-base cursor-pointer mt-6 sm:mt-8 md:mt-11 text-[var(--textClr)]"
      >
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <Link
              to={crumb.link}
              className="hover:text-[var(--secondryClr)] transition-colors"
            >
              {crumb.title}
            </Link>
            {index < breadcrumbs.length - 1 && <span>/</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Grid;
