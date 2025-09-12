import React, { useEffect, useState, useContext } from "react";
import parse, { domToReact } from "html-react-parser";
import { ThemeContext } from "../ThemeContext/ThemeContextProvider";

/* --- Helpers --- */
const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");
const nbspFix = (s = "") => s.replace(/&nbsp;/gi, " ").trim();

const TabsSection = () => {
  const [tabs, setTabs] = useState([]);
  const [header, setHeader] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [openAccordions, setOpenAccordions] = useState({});
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((json) => {
        const base =
          json?.content?.colPos0?.[8]?.content?.items?.[0]?.contentElements || [];

        const headerData = base?.[0]?.content?.bodytext || "";
        const tabData = base?.[1]?.content?.contentTabBlock || [];

        setHeader(headerData);
        setTabs(tabData);
        setActiveTab(tabData?.[0]?.contentTabText || "");
      })
      .catch((err) => console.error("Error fetching tabs:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  /* --- Split heading/subheading --- */
  const cleanHeader = nbspFix(stripHtml(header));
  const [titlePart, ...rest] = cleanHeader.split(/We bring/i);
  const subtitle = rest.length ? "We bring" + rest.join("We bring") : "";

  const titleWords = titlePart.trim().split(" ");
  const first = titleWords[0];
  const middle = titleWords.slice(1, -1).join(" ");
  const last = titleWords[titleWords.length - 1];

  /* --- Parser Options --- */
  const options = {
    replace: (domNode) => {
      if (domNode.name === "p") {
        return (
          <p
            className={`text-[18px] leading-7 mb-[16px] ${
              darkMode === "dark" ? "text-white/80" : "text-[var(--textClr)]"
            }`}
          >
            {domToReact(domNode.children, options)}
          </p>
        );
      }
    },
  };

  return (
    <section
      className={`overflow-hidden py-[96px] transition-colors duration-500 ${
        darkMode === "dark" ? "bg-[#b0eeef] mt-1" : "bg-[var(--grayClr)] mt-29"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-9">
        {/* Section Header */}
        <div className="mb-[48px] text-center">
          <h1
            className={`md:text-5xl font-extrabold leading-snug mb-3 ${
              darkMode === "dark" ? "text-white" : "text-[var(--secondryClr)]"
            }`}
          >
            <span className="text-[42px]">{first} </span>
            <span className="text-[42px] bg-gradient-to-r from-[var(--primaryClr)] via-[var(--teritoryClr)] to-[#f43fe2] bg-clip-text text-transparent">
              {middle}
            </span>{" "}
            <span className="text-[42px]">{last}</span>
          </h1>
          <p
            className={`text-[18px] leading-7 max-w-[570px] mx-auto ${
              darkMode === "dark" ? "text-white/70" : "text-[var(--textClr)]"
            }`}
          >
            {subtitle}
          </p>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden lg:block">
          <div className="border-b border-gray-300 dark:border-gray-600">
            <ul
              className={`flex flex-wrap justify-evenly text-center font-medium ${
                darkMode === "dark" ? "text-white" : "text-[var(--textClr)]"
              }`}
            >
              {tabs?.map((ele, index) => (
                <li className="me-2" key={index}>
                  <button
                    className={`inline-block text-[20px] pb-1 border-b-2 rounded-t-lg transition-all ${
                      activeTab === ele?.contentTabText
                        ? "border-[var(--primaryClr)] text-[var(--primaryClr)]"
                        : "border-transparent hover:text-[var(--primaryClr)] hover:border-gray-400"
                    }`}
                    onClick={() => setActiveTab(ele?.contentTabText)}
                  >
                    {ele?.contentTabText}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tab Content */}
          <div>
            {tabs?.map((ele, index) => (
              <div key={index}>
                {activeTab === ele?.contentTabText && (
                  <div>
                    {ele?.contentBlock?.map((e, i) => (
                      <div
                        key={i}
                        className="py-[32px] my-8 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 md:px-10"
                      >
                        <div
                          className={`my-[20px] lg:my-[60px] text-[28px] md:text-[42px] font-bold ${
                            darkMode === "dark"
                              ? "text-white"
                              : "text-[var(--secondryClr)]"
                          }`}
                        >
                          {e?.contentText && parse(e.contentText, options)}
                        </div>
                        <div className="lg:my-[20px] lg:px-[12px]">
                          <img
                            src={e?.contentImage?.[0]?.publicUrl}
                            alt=""
                            className="w-full h-auto rounded-lg shadow-md"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="block lg:hidden">
          {tabs?.map((ele, index) => {
            const isOpen = openAccordions[index];
            return (
              <div key={index} className="mb-4 border-b border-gray-300 pb-3">
                <button
                  onClick={() =>
                    setOpenAccordions((prev) => ({
                      ...prev,
                      [index]: !prev[index],
                    }))
                  }
                  className="w-full flex justify-between items-center text-left text-lg font-medium"
                >
                  <span
                    className={
                      darkMode === "dark"
                        ? "text-white"
                        : "text-[var(--textClr)]"
                    }
                  >
                    {ele?.contentTabText}
                  </span>
                  <span className="text-[24px]">
                    {isOpen ? "-" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-4">
                    {ele?.contentBlock?.map((e, i) => (
                      <div key={i} className="mb-6">
                        <div
                          className={`mb-3 text-[20px] font-bold ${
                            darkMode === "dark"
                              ? "text-white"
                              : "text-[var(--secondryClr)]"
                          }`}
                        >
                          {e?.contentText && parse(e.contentText, options)}
                        </div>
                        <img
                          src={e?.contentImage?.[0]?.publicUrl}
                          alt=""
                          className="w-full h-auto rounded-lg shadow-md"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TabsSection;
