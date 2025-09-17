import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../ThemeContext/ThemeContextProvider";
import { Link } from "react-router-dom";

const Main = () => {
  const { darkMode, stripe } = useContext(ThemeContext);

  const [data, setData] = useState({
    title: "",
    description: "",
    breadcrumbs: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/basic-elements/gallery")
      .then((res) => res.json())
      .then((json) => {
        const crumbs = json?.breadcrumbs || [];

    
        const findById = (obj, id) => {
          if (!obj || typeof obj !== "object") return null;
          if (obj.id === id) return obj;
          return Object.values(obj).reduce(
            (acc, val) => acc || findById(val, id),
            null
          );
        };

        const gallery = findById(json, 1353);
        const html = gallery?.content?.bodytext || "";

        const div = document.createElement("div");
        div.innerHTML = html;

        setData({
          title: div.querySelector("h1")?.innerText || "",
          description: div.querySelector("p")?.innerText || "",
          breadcrumbs: crumbs,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-110 w-full flex justify-center items-center">
        <p className={darkMode === "dark" ? "text-white" : "text-gray-600"}>
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative h-110 w-full flex flex-col justify-center items-center text-center px-6 py-10 ${
        darkMode === "dark" ? "bg-[#b0eeef]" : "bg-[var(--grayClr)]"
      }`}
    >
      {/* Stripe background */}
      {stripe && darkMode === "light" && (
        <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-0">
          <div className="absolute top-0 bottom-0 left-[380px] w-px bg-gray-200"></div>
          <div className="absolute top-0 bottom-0 right-[460px] w-[0.5px] bg-gray-200"></div>
        </div>
      )}

      {/* Title */}
      <h1
        className={`relative text-[32px] sm:text-[38px] font-extrabold ${
          darkMode === "dark" ? "text-white" : "text-[var(--secondryClr)]"
        }`}
      >
        {data.title}
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

export default Main;
