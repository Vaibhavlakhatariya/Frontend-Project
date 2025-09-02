import React, { useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";
import { FaCheck } from "react-icons/fa6";

const NeedHelp = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Simple fetch API with useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://t3-reva.t3planet.de/"); // replace with your API endpoint
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

  const base = data?.content?.colPos0?.[14]?.content?.items?.[0];
  const title = base?.contentElements?.[0]?.content?.bodytext;
  const content = base?.contentElements?.[1]?.content?.items;

  // 🔹 Parse options
  const options = {
    replace: (domNode) => {
      if (
        domNode.name === "span" &&
        domNode.attribs?.class?.includes("gradient-color")
      ) {
        return (
          <span className="bg-gradient-to-r from-[var(--primaryClr)] to-[var(--secondryClr)] bg-clip-text text-transparent font-bold">
            {domToReact(domNode.children, options)}
          </span>
        );
      }
      if (domNode.name === "h2") {
        return (
          <h2 className="text-[42px] justify-center md:flex gap-3 font-bold text-[var(--secondryClr)]">
            {domToReact(domNode.children, options)}
          </h2>
        );
      }
      if (domNode.name === "p") {
        return (
          <p className="text-[18px] mb-[16px] font-normal">
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
    <div className="bg-[#cfcdcd42]">
      <div className="px-[12px] lg:mx-[55px]">
        {/* Title */}
        <div className="pt-[96px] pb-[48px] text-center text-[#61dcdf]">
          {title && parse(title, options)}
        </div>

        {/* Content */}
        <div className="pb-[96px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {content?.map((ele, index) => (
              <div className="px-[12px] mt-[24px]" key={index}>
                <div className="py-[48px] bg-white px-[40px]">
                  {/* Icon */}
                  <div className="w-[65px]">
                    <img
                      src={ele?.contentElements[0]?.content?.icon?.[0]?.publicUrl}
                      alt=""
                      className="p-[18px] bg-[var(--grayClr)]/30 mb-[20px]"
                    />
                  </div>

                  {/* Text */}
                  <div>
                    <h2 className="text-[24px] text-[#61dcdf] font-medium mb-[20px]">
                      {ele?.contentElements[0]?.content?.header}
                    </h2>
                    <p className="mb-[16px] text-[20px] text-[#617798]">
                      {ele?.contentElements[0]?.content?.text}
                    </p>

                    {/* List */}
                    <ul className="mb-[10px] text-[#617798]">
                      {ele?.contentElements[0]?.content?.listBlock?.map(
                        (e, i) => (
                          <li key={i} className="mb-[10px]">
                            <p className="text-[16px] gap-3 flex items-center">
                              <FaCheck className="text-[#4c6fff]" />
                              {e?.list}
                            </p>
                          </li>
                        )
                      )}
                    </ul>

                    {/* Button */}
                    <div className="mt-[38px]">
                      <button className="px-6 py-3  bg-gradient-to-r from-[#4c6fff] to-[#f43fe2] text-white font-semibold shadow-md hover:opacity-90 transition">
                        {ele?.contentElements[0]?.content?.linkText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedHelp;
