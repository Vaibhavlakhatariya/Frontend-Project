import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../ThemeContext/ThemeContextProvider";
import { Link } from "react-router-dom";

const BlockquotesHeader = () => {
  const { darkMode, stripe } = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/basic-elements/blockquotes")
      .then((res) => res.json())
      .then((json) => {
        // Recursive finder to locate blockquotes header text
        const findBodytext = (obj) => {
          if (!obj || typeof obj !== "object") return null;
          if (obj.content?.bodytext?.includes("blockquotes")) {
            return obj.content.bodytext;
          }
          for (let key in obj) {
            const result = findBodytext(obj[key]);
            if (result) return result;
          }
          return null;
        };

        const bodytext = findBodytext(json) || "";
        const div = document.createElement("div");
        div.innerHTML = bodytext;

        setData({
          title: div.querySelector("h1,h2")?.innerText || "Elegant blockquotes",
          description:
            div.querySelector("p")?.innerText ||
            "Each element offers a full set of customization options.",
          breadcrumbs: json?.breadcrumbs || [],
        });
      })
      .catch((err) => console.error("Error fetching blockquotes:", err));
  }, []);

  if (!data) {
    return (
      <div className="h-60 flex items-center justify-center">
        <p className={darkMode === "dark" ? "text-white" : "text-gray-600"}>
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative h-110 w-full flex flex-col justify-center items-center text-center px-6 py-10 ${
        darkMode === "dark" ? "bg-[#b0eeef]" : "bg-gray-100"
      }`}
    >
      {/* Stripe background */}
      {stripe && darkMode === "light" && (
        <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-0">
          <div className="absolute top-0 bottom-0 left-[380px] w-px bg-gray-200"></div>
          <div className="absolute top-0 bottom-0 right-[460px] w-[0.5px] bg-gray-200"></div>
        </div>
      )}

      {/* Title with gradient underline */}
      <h1
        className={`relative text-[32px] sm:text-[38px] font-extrabold ${
          darkMode === "dark" ? "text-white" : "text-[var(--secondryClr)]"
        }`}
      >
        {data.title}
        <span className="absolute left-30 bottom-1 w-50 h-3 p-2.5 sm:h-4 bg-gradient-to-r from-[var(--primaryClr)] to-blue-300 z-0"></span>
      </h1>

      {/* Description */}
      <p
        className={`relative mt-4 max-w-[700px] text-[16px] sm:text-[18px] leading-relaxed ${
          darkMode === "dark" ? "text-white" : "text-[var(--textClr)]"
        }`}
      >
        {data.description}
      </p>

      {/* Breadcrumbs */}
      <div
        className={`relative flex flex-wrap justify-center gap-2 sm:gap-3 mt-8 text-[14px] sm:text-[16px] ${
          darkMode === "dark" ? "text-white" : "text-[var(--textClr)]"
        }`}
      >
        {data.breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            <Link
              to={crumb.link}
              className="hover:text-blue-400 transition-colors duration-300"
            >
              {crumb.title}
            </Link>
            {i < data.breadcrumbs.length - 1 && <span>/</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlockquotesHeader;
