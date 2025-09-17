import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext/ThemeContextProvider";

const PreBuiltSection = () => {
  const [section, setSection] = useState(null);
  const navigate = useNavigate();
  const { darkMode, stripe } = useContext(ThemeContext); // Added stripe from context
  // const col = localStorage.getItem("color");

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((data) => {
        const blocks = data?.content?.colPos0 || [];
        let target = null;

        blocks.forEach((block) => {
          block?.content?.items?.forEach((item) => {
            item?.contentElements?.forEach((el) => {
              if (el?.content?.bodytext?.includes("8+ Pre-Built")) {
                target = el.content.bodytext;
              }
            });
          });
        });

        if (!target) return;

        const getText = (regex) =>
          (target.match(regex)?.[1] || "")
            .replace(/<br\s*\/?>/gi, " ")
            .replace(/&nbsp;/gi, " ")
            .replace(/<[^>]+>/g, "")
            .trim();

        setSection({
          headingText: getText(/<h2[^>]*>(.*?)<\/h2>/i),
          paragraph: getText(/<p[^>]*>(.*?)<\/p>/i),
          buttonText: getText(/<a[^>]*>(.*?)<\/a>/i),
        });
      })
      .catch((err) => console.error("Error fetching section:", err));
  }, []);

  if (!section) {
    return (
      <p
        className={`text-center text-xl font-semibold mt-10 transition-colors duration-500 ${
          darkMode === "dark" ? "text-white" : "text-gray-500"
        }`}
      >
        Loading...
      </p>
    );
  }

  const { headingText, paragraph, buttonText } = section;

  return (
    <div
      className={`px-6 flex flex-col justify-center items-center text-center py-20 transition-colors duration-500 relative ${
        darkMode === "dark" ? "bg-[#61dcdf]" : "bg-white"
      }`}
      // style={{ backgroundColor: darkMode === "dark" ? "#61dcdf" : "#fff" }}
    >
      {/* Stripe background */}
      {stripe && darkMode === "light" && (
        <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-0">
          <div className="absolute top-0 bottom-0 left-[393px] w-px bg-gray-200"></div>
          <div className="absolute top-0 bottom-0 right-[470px] w-[0.5px] bg-gray-200"></div>
        </div>
      )}

      <h1
        className={`text-[38px] font-extrabold transition-colors duration-500 relative  ${
          darkMode === "dark" ? "text-white" : "text-[var(--secondryClr)]"
        }`}
      >
        {headingText.slice(0, 13)}
        {headingText.length > 13 && (
          <span className="bg-gradient-to-r from-[var(--primaryClr)] via-[var(--teritoryClr)] to-pink-500 text-transparent bg-clip-text">
            {headingText.slice(13)}
          </span>
        )}
      </h1>

      <p
        className={`mt-3 max-w-[560px] font-mono leading-relaxed tracking-wide text-lg transition-colors duration-500 relative ${
          darkMode === "dark" ? "text-white" : "text-[var(--textClr)]"
        }`}
      >
        {paragraph}
      </p>

      <button
        onClick={() => navigate("/contact-us")}
        className={`mt-12 px-10 py-4 relative  cursor-pointer overflow-hidden border font-medium text-md group transition-colors duration-500
          ${
            darkMode === "dark"
              ? "border-none bg-blue-500 text-white"
              : "border-[var(--primaryClr)] bg-[var(--primaryClr)] text-white"
          }`}
      >
        <span className="relative z-10 transition-colors duration-500 group-hover:text-[var(--primaryClr)]">
          {buttonText}
        </span>
        <span className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
      </button>
    </div>
  );
};

export default PreBuiltSection;
