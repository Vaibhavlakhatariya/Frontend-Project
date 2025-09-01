import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PreBuiltSection = () => {
  const [section, setSection] = useState(null);
  const navigate = useNavigate();

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
      <p className="text-center text-xl font-semibold text-gray-500 mt-10">
        Loading...
      </p>
    );
  }

  const { headingText, paragraph, buttonText } = section;

  return (
    <div className="px-6 flex flex-col justify-center items-center text-center py-20">
      <h1 className="text-[38px] font-extrabold text-[#61dcdf]">
        {headingText.slice(0, 13)}
        {headingText.length > 13 && (
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            {headingText.slice(13)}
          </span>
        )}
      </h1>

      <p className="mt-3 max-w-[560px] font-mono leading-relaxed tracking-wide text-gray-500 text-lg">
        {paragraph}
      </p>

      <button
        onClick={() => navigate("/contact-us")}
        className="mt-12 px-10 py-4 relative cursor-pointer overflow-hidden
                   border border-blue-600 bg-blue-600 text-white font-medium text-md group"
      >
        <span className="relative z-10 transition-colors duration-500 group-hover:text-blue-600">
          {buttonText}
        </span>
        <span className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
      </button>
    </div>
  );
};

export default PreBuiltSection;
