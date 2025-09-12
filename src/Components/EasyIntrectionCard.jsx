import React, { useEffect, useState, useContext } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ThemeContext } from "../ThemeContext/ThemeContextProvider"; 

const EasyIntrectionCard = () => {
  const [data, setData] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error("API ERROR:", err));
  }, []);

  if (!data) return <p className="text-center text-gray-500">Loading...</p>;

  const base1 = data?.content?.colPos0?.[9]?.content?.items?.[0];
  const cards = base1?.contentElements?.[1]?.content?.items || [];

  return (
    <div
      className={`my-10 py-10 transition-colors duration-500 ${
        darkMode === "dark" ? "bg-[#61dcdf] mt-0" : "bg-white"
      }`}
    >
      <div className="px-3 max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center my-5 py-5">
          <h1
            className={`text-[42px] font-bold leading-snug ${
              darkMode === "dark" ? "text-white" : "text-[var(--secondryClr)]"
            }`}
          >
            <span>Easy Integration with Below </span>
            <span className="bg-gradient-to-r from-[var(--primaryClr)] to-[var(--teritoryClr)] bg-clip-text text-transparent">
              Products
            </span>
          </h1>
          <p
            className={`text-[18px] leading-7 py-1 max-w-[450px] mx-auto ${
              darkMode === "dark" ? "text-white/70" : "text-[var(--textClr)]"
            }`}
          >
            This template comes super easy when integrating with other popular
            TYPO3 Products.
          </p>
        </div>

        {/* Cards */}
        <div className="my-5 py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((ele, index) => (
              <div className="py-5 px-2" key={index}>
                {ele?.contentElements?.map((e, i) => (
                  <div
                    key={i}
                    className={`px-8 py-10 rounded-md border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                      darkMode === "dark"
                        ? "bg-white "
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col gap-6">
                      {/* Icon */}
                      <img
                        src={e?.content?.icon?.[0]?.publicUrl}
                        alt=""
                        className="h-14 w-14"
                      />

                      {/* Header */}
                      <h1
                        className={`text-2xl  ${
                          darkMode === "dark"
                            ? "text-[var(--secondryClr)] font-medium"
                            : "text-[var(--secondryClr)]"
                        }`}
                      >
                        {e?.content?.header}
                      </h1>

                      {/* Description */}
                      <p
                        className={`text-[18px] leading-7 ${
                          darkMode === "dark"
                            ? "text-gray-600"
                            : "text-[var(--textClr)]"
                        }`}
                      >
                        {e?.content?.text}
                      </p>

                      {/* Link */}
                      <a
                        href={e?.content?.link?.href}
                        className={`my-5 flex gap-2 items-center text-[16px] font-medium transition-colors ${
                          darkMode === "dark"
                            ? "text-blue hover:text-[var(--primaryClr)]"
                            : "text-gray-700 hover:text-[var(--primaryClr)]"
                        }`}
                      >
                        {e?.content?.linkText} <FaLongArrowAltRight />
                      </a>
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

export default EasyIntrectionCard;
