import React, { useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";
import { FaPlus } from "react-icons/fa6";
import { RiSubtractLine } from "react-icons/ri";

/* GradientText1 Component (self-contained) */
const GradientText1 = ({ text, className = "" }) => {
  return (
    <span
      className={`bg-gradient-to-r from-[#4c6fff] to-[#f43fe2] bg-clip-text text-transparent ${className}`}
    >
      {text}
    </span>
  );
};

const AccordianSection = () => {
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
        return (
          <GradientText1 text={domToReact(domNode.children, options)} />
        );
      }

      if (domNode.name === "h2") {
        return (
          <h2 className="text-[42px] justify-center md:flex gap-3 font-bold text-[#61dcdf]">
            {domToReact(domNode.children, options)}
          </h2>
        );
      }

      if (domNode.name === "p") {
        return (
          <p className="text-[18px] mb-[16px] font-normal text-[#617798]">
            {domToReact(domNode.children, options)}
          </p>
        );
      }
    },
  };

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="py-[96px]">
      <div className="px-[12px] lg:mx-[55px]">
        {/* Section Title */}
        <div className="pb-[48px] text-center">
          {title && parse(title, options)}
        </div>

        {/* Accordion Content */}
        <div className="pt-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {content?.map((ele, index) => (
              <div className="mt-[24px] px-[12px]" key={index}>
                {ele?.contentElements?.[0]?.content?.accordionItem.map(
                  (e, i) => (
                    <div
                      className="border text-[18px] border-gray-200 mb-[15px]"
                      key={i}
                    >
                      {/* Accordion Header */}
                      <div className="px-[30px] py-[20px] font-medium">
                        <h1 className="text-[#61dcdf]">
                          <button
                            className="relative text-start hover:text-blue-500 w-[100%]"
                            onClick={() => toggleAccordion(i)}
                          >
                            {e.title}
                            <span className="text-[#617798] absolute top-[50%] -translate-y-1/2 -right-5">
                              {openIndex === i ? (
                                <RiSubtractLine />
                              ) : (
                                <FaPlus />
                              )}
                            </span>
                          </button>
                        </h1>
                      </div>

                      {/* Accordion Body */}
                      <div
                        className={`transition-all duration-700 ease-in-out overflow-hidden text-[#617798] ${
                          openIndex === i
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pe-[70px] pb-[25px] ps-[30px]">
                          {e.content}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordianSection;
