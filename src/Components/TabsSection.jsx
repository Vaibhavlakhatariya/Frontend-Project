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
  // Example: "Powerful visual editing tools We bring all the tools..."
  const [titlePart, ...rest] = cleanHeader.split(/We bring/i);
  const subtitle = rest.length ? "We bring" + rest.join("We bring") : "";

  // Split title into 3 parts
  const titleWords = titlePart.trim().split(" ");
  const first = titleWords[0]; // "Powerful"
  const middle = titleWords.slice(1, -1).join(" "); // "visual editing"
  const last = titleWords[titleWords.length - 1]; // "tools"

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
    },
  };

  return (
    <section className="overflow-hidden bg-[#cfcdcd42] py-[96px] mt-29">
      <div className="max-w-7xl mx-auto px-9">
        {/* Section Header */}
        <div className="mb-[48px] text-center">
          <h1 className="md:text-5xl font-extrabold leading-snug mb-3">
            <span className="text-[#61dcdf] text-[42px]">{first} </span>
            <span className="text-[42px] bg-gradient-to-r from-[#4c6fff] via-[#9b5cfb] to-[#f43fe2] bg-clip-text text-transparent">
              {middle}
            </span>{" "}
            <span className="text-[#61dcdf] text-[42px]">{last}</span>
          </h1>
          <p className="text-[18px] leading-7 max-w-[570px] mx-auto text-[#617798]">
            {subtitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="pt-[48px]">
          <div className="lg:px-3">
            {/* Tabs Header */}
            <div className="border-b border-gray-200">
              <ul className="flex flex-wrap justify-evenly text-center text-[#617798] font-medium">
                {tabs?.map((ele, index) => (
                  <li className="me-2" key={index}>
                    <button
                      className={`inline-block text-[20px] pb-1 border-b-2 rounded-t-lg ${
                        activeTab === ele?.contentTabText
                          ? "border-blue-500 w-full text-blue-500"
                          : "border-transparent w-full hover:text-blue-600 hover:border-gray-300"
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
              {tabs?.map((ele, index) => (
                <div key={index}>
                  {activeTab === ele?.contentTabText && (
                    <div>
                      {ele?.contentBlock?.map((e, i) => (
                        <div
                          key={i}
                          className="py-[32px]  my-8 rounded-lg grid grid-cols-1 lg:grid-cols-2 px-17"
                        >
                          <div className="my-[85px] lg:px-[12px] text-[42px] text-[#61dcdf] font-bold  ">
                            {e?.contentText && parse(e.contentText, options)}
                          </div>
                          <div className="lg:my-[48px] lg:px-[12px]">
                            <img
                              src={e?.contentImage?.[0]?.publicUrl}
                              alt=""
                              style={{ height: "100%" }}
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
        </div>
      </div>
    </section>
  );
};

export default TabsSection;
