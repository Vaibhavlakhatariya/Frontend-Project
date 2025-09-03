import React, { useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";

/* --- Helpers --- */
const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");
const nbspFix = (s = "") => s.replace(/&nbsp;/gi, " ").trim();

const TabsSection = () => {
  const [tabs, setTabs] = useState([]);
  const [header, setHeader] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((json) => {
        const base =
          json?.content?.colPos0?.[8]?.content?.items?.[0]?.contentElements ||
          [];

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

  /* --- Parser Options --- */
  const options = {
    replace: (domNode) => {
      if (domNode.name === "p") {
        return (
          <p className="text-[18px] leading-7 mb-[16px] text-[#617798]">
            {domToReact(domNode.children, options)}
          </p>
        );
      }
      if (domNode.name === "h2") {
        return (
          <h2 className="text-[42px] font-bold text-[#61dcdf] mb-4">
            {domToReact(domNode.children, options)}
          </h2>
        );
      }
    },
  };

  return (
    <section className="overflow-hidden bg-[#cfcdcd42] py-[96px] mt-35">
      <div className="max-w-7xl mx-[39.5px] px-[50px]">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-snug mb-4">
            <span className="text-[#61dcdf]">Powerful </span>
            <span className="bg-gradient-to-r from-[#4c6fff] to-[#f43fe2] bg-clip-text text-transparent">
              visual editing
            </span>{" "}
            <span className="text-[#61dcdf]">tools</span>
          </h1>
          <p className="text-base md:text-lg leading-7 max-w-2xl mx-auto text-[#617798]">
            We bring all the tools you need to create a beautiful website <br />{" "}
            without having to write a single line of code.
          </p>
        </div>

        {/* Tabs Header */}
        <div className="border-b border-gray-200">
          <ul className="flex flex-wrap justify-center gap-40 text-center">
            {tabs.map((ele, index) => (
              <li key={index}>
                <button
                  className={`pb-2 text-[20px] font-semibold transition-all text-[#617798] ${
                    activeTab === ele?.contentTabText
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "border-transparent hover:text-blue-500"
                  }`}
                  onClick={() => setActiveTab(ele?.contentTabText)}
                >
                  {ele?.contentTabText}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tabs Content */}
        <div>
          {tabs.map((ele, index) =>
            activeTab === ele?.contentTabText ? (
              <div
                key={index}
                className="py-[70px] grid grid-cols-1 lg:grid-cols-2  gap-0 items-center"
              >
                {/* Left Text */}
                <div>
                  {ele?.contentBlock?.[0]?.contentText &&
                    parse(ele.contentBlock[0].contentText, options)}
                </div>

                {/* Right Image */}
                <div className="flex justify-center">
                  <img
                    src={ele?.contentBlock?.[0]?.contentImage?.[0]?.publicUrl}
                    alt="Tab Visual"
                    className="max-w-[600px] w-full  shadow-md"
                  />
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
};

export default TabsSection;
