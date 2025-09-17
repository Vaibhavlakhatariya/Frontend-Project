import React, { useEffect, useState, useContext } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiSubtractLine } from "react-icons/ri";
import parse, { domToReact } from "html-react-parser";
import { ThemeContext } from "../ThemeContext/ThemeContextProvider";

const GradientText1 = ({ text, className = "" }) => (
  <span
    className={`bg-gradient-to-r from-[var(--primaryClr)] to-[var(--teritoryClr)] bg-clip-text text-transparent ${className}`}
  >
    {text}
  </span>
);

const AccordianSection = () => {
  const { darkMode, stripe } = useContext(ThemeContext);
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

  const toggleAccordion = (i) => setOpenIndex(openIndex === i ? null : i);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

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
            className="text-[18px] mb-4 font-normal"
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

  return (
    <section
      className={`relative py-24 transition-colors duration-500 ${
        darkMode === "dark" ? "bg-[#61dcdf]" : "bg-white"
      }`}
    >
      {/* Optional Stripe Background */}
      {stripe && darkMode === "light" && (
        <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-0">
          <div className="absolute top-0 bottom-0 left-[393px] w-px bg-gray-200"></div>
          <div className="absolute top-0 bottom-0 right-[470px] w-[0.5px] bg-gray-200"></div>
        </div>
      )}

      <div className="px-[12px] lg:mx-[55px] relative">
        {/* Section Title */}
        <div className="pb-12 text-center">
          {title && parse(title, options)}
        </div>

        {/* Accordion Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content?.map((ele, index) => (
            <div className="mt-6 px-3" key={index}>
              {ele?.contentElements?.[0]?.content?.accordionItem.map((e, i) => (
                <div
                  key={i}
                  className={`border mb-4 rounded-md transition-colors duration-500 ${
                    darkMode === "dark"
                      ? "border-[#2a2a3a]/10"
                      : "border-gray-200"
                  }`}
                >
                  {/* Accordion Header */}
                  <div
                    className={`px-6 py-5 font-medium cursor-pointer ${
                      darkMode === "dark" ? "bg-[#fff]" : "bg-white"
                    }`}
                  >
                    <button
                      className="relative w-full text-left flex justify-between items-center"
                      onClick={() => toggleAccordion(i)}
                      style={{
                        color:
                          darkMode === "dark"
                            ? "#61dcdf"
                            : "var(--secondryClr)",
                      }}
                    >
                      {e.title}
                      <span>
                        {openIndex === i ? <RiSubtractLine /> : <FaPlus />}
                      </span>
                    </button>
                  </div>

                  {/* Accordion Body */}
                  <div
                    className={`overflow-hidden transition-all duration-700 ease-in-out ${
                      openIndex === i
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div
                      className="px-6 py-4"
                      style={{
                        color:
                          darkMode === "dark" ? "#ffffff/70" : "var(--textClr)",
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
    </section>
  );
};

export default AccordianSection;
