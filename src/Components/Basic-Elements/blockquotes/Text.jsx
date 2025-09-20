import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../../ThemeContext/ThemeContextProvider";

const Text = () => {
  const { darkMode } = useContext(ThemeContext);
  const [section, setSection] = useState(null);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/basic-elements/blockquotes")
      .then((res) => res.json())
      .then((json) => {
        // Find blockquote items recursively
        const findBlockquotes = (obj) => {
          if (!obj || typeof obj !== "object") return [];
          let result = [];

          if (obj.content?.bodytext?.includes("blockquote")) {
            result.push(obj.content.bodytext);
          }

          for (let key in obj) {
            const res = findBlockquotes(obj[key]);
            if (res.length) result = [...result, ...res];
          }
          return result;
        };

        const allQuotes = findBlockquotes(json);

        // Parse the first <h2> for section title
        let title = "Text blockquotes light background";
        const div = document.createElement("div");
        if (allQuotes[0]) {
          div.innerHTML = allQuotes[0];
          title = div.querySelector("h2")?.innerText || title;
        }

        // Extract each blockquote <blockquote>
        const quotes = [];
        allQuotes.forEach((html) => {
          const temp = document.createElement("div");
          temp.innerHTML = html;
          temp.querySelectorAll("blockquote").forEach((bq) => {
            quotes.push({
              text: bq.innerText.replace(/\n/g, " ").trim(),
              author:
                bq.querySelector("cite")?.innerText ||
                bq.querySelector("strong")?.innerText ||
                "",
            });
          });
        });

        setSection({ title, quotes });
      })
      .catch((err) => console.error("Error fetching blockquotes:", err));
  }, []);

  if (!section) {
    return (
      <div className="h-60 flex items-center justify-center">
        <p className={darkMode === "dark" ? "text-white" : "text-gray-600"}>
          Loading blockquotes...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`py-16 px-6 sm:px-10 lg:px-20 text-center ${
        darkMode === "dark" ? "bg-[#1e293b]" : "bg-white"
      }`}
    >
      {/* Section title */}
      <h2
        className={`relative text-[28px] sm:text-[34px] font-extrabold mb-10 ${
          darkMode === "dark" ? "text-white" : "text-[var(--secondryClr)]"
        }`}
      >
        {section.title}
        <span className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-28 h-[3px] rounded bg-gradient-to-r from-[var(--primaryClr)] via-blue-400 to-transparent"></span>
      </h2>

      {/* Quotes */}
      <div className="grid gap-10 max-w-4xl mx-auto">
        {section.quotes.map((q, i) => (
          <blockquote
            key={i}
            className={`relative border-l-4 pl-6 text-left italic ${
              darkMode
                ? "border-blue-300 text-white"
                : "border-blue-500 text-gray-700"
            }`}
          >
            <p className="mb-3">“{q.text}”</p>
            {q.author && (
              <footer
                className={`font-semibold not-italic ${
                  darkMode ? "text-blue-200" : "text-[var(--secondryClr)]"
                }`}
              >
                {/* {q.author} */}
              </footer>
            )}
          </blockquote>
        ))}
      </div>
    </div>
  );
};

export default Text;
