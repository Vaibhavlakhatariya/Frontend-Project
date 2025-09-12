import React, { useEffect, useState, useContext } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiSubtractLine } from "react-icons/ri";
import parse, { domToReact } from "html-react-parser";
import { ThemeContext } from "../ThemeContext/ThemeContextProvider"; 

const GradientText1 = ({ text, className = "" }) => {
  return (
    <span
      className={`bg-gradient-to-r from-[var(--primaryClr)] to-[var(--teritoryClr)] bg-clip-text text-transparent ${className}`}
    >
      {text}
    </span>
  );
};

const AccordianSection = () => {
  const { darkMode } = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching accordion:", err))
      .finally(() => setLoading(false));
  }, []);

  const toggleAccordion = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const base = data?.content?.colPos0?.[15]?.content?.items?.[0];
  const title = base?.contentElements?.[0]?.content?.bodytext;
  const content = base?.contentElements?.[1]?.content?.items;

  const options = {
    replace: (domNode) => {
      if (
        domNode.name === "span" &&
        domNode.attribs?.class?.includes("gradient-color")
      ) {
        return <GradientText1 text={domToReact(domNode.children, options)} />;
      }

      if (domNode.name === "h2") {
        return (
          <h2
            className="text-[42px] justify-center md:flex gap-3 font-bold"
            style={{
              color: darkMode === "dark" ? "#fff" : "var(--secondryClr)",
            }}
          >
            {domToReact(domNode.children, options)}
          </h2>
        );
      }

      if (domNode.name === "p") {
        return (
          <p
            className="text-[18px] mb-[16px] font-normal"
            style={{
              color: darkMode === "dark" ? "#fff" : "var(--textClr)",
            }}
          >
            {domToReact(domNode.children, options)}
          </p>
        );
      }
    },
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div
      className={`py-[96px] transition-colors duration-500 ${
        darkMode === "dark" ? "bg-[#61dcdf]" : "bg-white"
      }`}
    >
      <div className="px-[12px] lg:mx-[55px]">
        {/* Section Title */}
        <div className="pb-[48px] text-center">
          {title && parse(title, options)}
        </div>

        <div className="pt-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content?.map((ele, index) => (
              <div className="mt-[24px] px-[12px]" key={index}>
                {ele?.contentElements?.[0]?.content?.accordionItem.map((e, i) => (
                  <div
                    key={i}
                    className={`border mb-[15px] transition-colors duration-500 rounded-md ${
                      darkMode === "dark" ? "border-[#2a2a3a]/10" : "border-gray-200"
                    }`}
                  >
                    {/*  Header */}
                    <div
                      className={`px-[30px] py-[20px] font-medium cursor-pointer ${
                        darkMode === "dark" ? "bg-[#fff]" : "bg-white"
                      }`}
                    >
                      <h1
                        className="text-[var(--secondryClr)]"
                        style={{
                          color: darkMode === "dark" ? "#61dcdf" : "var(--secondryClr)",
                        }}
                      >
                        <button
                          className="relative text-start w-full"
                          onClick={() => toggleAccordion(i)}
                        >
                          {e.title}
                          <span
                            className={`absolute top-[50%] -translate-y-1/2 -right-5 ${
                              darkMode === "dark" ? "text-grey-700" : "text-[var(--textClr)]"
                            }`}
                          >
                            {openIndex === i ? <RiSubtractLine /> : <FaPlus />}
                          </span>
                        </button>
                      </h1>
                    </div>

                    {/*  Body */}
                    <div
                      className={`overflow-hidden transition-all duration-700 ease-in-out ${
                        openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div
                        className="pe-[70px] pb-[25px] ps-[30px]"
                        style={{
                          color: darkMode === "dark" ? "#ffffff/70" : "var(--textClr)",
                        }}
                      >
                        {e.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordianSection;
