import React, { useEffect, useState, useContext } from "react";
import parse, { domToReact } from "html-react-parser";
import { FaCheck } from "react-icons/fa6";
import { ThemeContext } from "../ThemeContext/ThemeContextProvider";

const NeedHelp = () => {
  const { darkMode, stripe } = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://t3-reva.t3planet.de/");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  const base = data?.content?.colPos0?.[14]?.content?.items?.[0];
  const titleHTML = base?.contentElements?.[0]?.content?.bodytext;
  const content = base?.contentElements?.[1]?.content?.items;

  let heading = "";
  let subheading = "";

  if (titleHTML) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = titleHTML;
    const h2 = wrapper.querySelector("h2");
    const p = wrapper.querySelector("p");
    if (h2) heading = h2.outerHTML;
    if (p) subheading = p.outerHTML;
  }

  const options = {
    replace: (domNode) => {
      if (
        domNode.name === "span" &&
        domNode.attribs?.class?.includes("gradient-color")
      ) {
        return (
          <span className="bg-gradient-to-r from-[var(--primaryClr)] to-[var(--teritoryClr)] bg-clip-text text-transparent font-bold">
            {domToReact(domNode.children, options)}
          </span>
        );
      }
    },
  };

  return (
    <section
      className={`relative transition-colors duration-500 ${
        darkMode === "dark" ? "bg-[#b0eeef]" : "bg-[var(--grayClr)]"
      }`}
    >
      {/* Optional Stripe Background */}
      {stripe && darkMode === "light" && (
        <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-0">
          <div className="absolute top-0 bottom-0 left-[393px] w-px bg-gray-200"></div>
          <div className="absolute top-0 bottom-0 right-[470px] w-[0.5px] bg-gray-200"></div>
        </div>
      )}

      <div className="px-3 lg:mx-[55px] relative ">
        {/* Heading */}
        <div
          className="pt-[96px] pb-[20px] text-center text-[36px] font-bold"
          style={{
            color: darkMode === "dark" ? "#61dcdf" : "var(--secondryClr)",
          }}
        >
          {heading && parse(heading, options)}
        </div>

        {/* Subheading */}
        <div
          className="pb-[48px] text-center text-[18px]"
          style={{
            color: darkMode === "dark" ? "#ffffff/70" : "var(--textClr)",
          }}
        >
          {subheading && parse(subheading, options)}
        </div>

        {/* Content Cards */}
        <div className="pb-[96px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content?.map((ele, index) => (
            <div className="px-[12px] mt-[24px]" key={index}>
              <div
                className={`py-[48px] px-[40px] transition-all duration-300 rounded-lg ${
                  darkMode === "dark"
                    ? "bg-[#fff] border border-[#2a2a3a]/10"
                    : "bg-white border border-gray-200"
                }`}
              >
                {/* Icon */}
                <div className="w-[65px]">
                  <img
                    src={ele?.contentElements[0]?.content?.icon?.[0]?.publicUrl}
                    alt=""
                    className={`p-[18px] mb-[20px] ${
                      darkMode === "dark"
                        ? "bg-[#CDCBCB]/20"
                        : "bg-[#CDCBCB]/30"
                    }`}
                  />
                </div>

                {/* Text */}
                <div>
                  <h2
                    className="text-[24px] font-medium mb-[20px]"
                    style={{
                      color:
                        darkMode === "dark" ? "#61dcdf" : "var(--secondryClr)",
                    }}
                  >
                    {ele?.contentElements[0]?.content?.header}
                  </h2>
                  <p
                    className="mb-[16px] text-[20px] leading-relaxed"
                    style={{
                      color:
                        darkMode === "dark" ? "#ffffff/70" : "var(--textClr)",
                    }}
                  >
                    {ele?.contentElements[0]?.content?.text}
                  </p>

                  {/* List */}
                  <ul className="mb-[10px]">
                    {ele?.contentElements[0]?.content?.listBlock?.map(
                      (e, i) => (
                        <li key={i} className="mb-[10px]">
                          <p
                            className="text-[16px] gap-3 flex items-center"
                            style={{
                              color:
                                darkMode === "dark"
                                  ? "#ffffff/70"
                                  : "var(--textClr)",
                            }}
                          >
                            <FaCheck
                              className="w-4 h-4"
                              style={{
                                color:
                                  darkMode === "dark"
                                    ? "#61dcdf"
                                    : "var(--primaryClr)",
                              }}
                            />
                            {e?.list}
                          </p>
                        </li>
                      )
                    )}
                  </ul>

                  {/* Button */}
                  <div className="mt-[38px]">
                    <button
                      className={`px-6 py-3 font-semibold shadow-md rounded-md transition hover:opacity-90 ${
                        darkMode === "dark"
                          ? "bg-gradient-to-r from-[#4c6fff] to-[#f43fe2] text-white"
                          : "bg-gradient-to-r from-[var(--primaryClr)] to-[var(--teritoryClr)] text-white"
                      }`}
                    >
                      {ele?.contentElements[0]?.content?.linkText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeedHelp;
