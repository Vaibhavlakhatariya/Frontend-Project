import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const EasyIntrectionCard = () => {
  const [data, setData] = useState(null);

  // ✅ Fetch API
  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error("API ERROR:", err));
  }, []);

  if (!data) return <p className="text-center text-gray-500">Loading...</p>;

  // ✅ Extract section data
  const base1 = data?.content?.colPos0?.[9]?.content?.items?.[0];
  // const header = base1?.contentElements?.[0]?.content?.bodytext || "";
  const cards = base1?.contentElements?.[1]?.content?.items || [];

  return (
    <div className="my-10 py-2">
      <div className="px-3 max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center my-5 py-5">
          <h1 className="text-[42px] font-bold leading-snug">
            <span className="text-[#61DCDF] ">Easy Integration with Below</span>{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Products
            </span>
          </h1>
          <p className="text-[18px] leading-7   py-1 max-w-[450px] mx-auto text-[#617798]">
            This template comes super easy when integrating with other popular
            TYPO3 Products.
          </p>
        </div>

        {/* Cards */}
        <div className="my-5 py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((ele, index) => (
              <div className="py-5 px-2" key={index}>
                {ele?.contentElements?.map((e, i) => (
                  <div
                    className="px-8 py-10 border border-gray-200 rounded-md hover:shadow-md transition"
                    key={i}
                  >
                    <div className="flex flex-col gap-8">
                      <img
                        src={e?.content?.icon?.[0]?.publicUrl}
                        alt=""
                        className="h-14 w-14"
                      />
                      <h1 className="text-2xl text-[#61DCDF]">
                        {e?.content?.header}
                      </h1>
                      <p className="text-[20px]  text-[#617798]">{e?.content?.text}</p>
                      <a
                        href={e?.content?.link?.href}
                        className="my-5 flex gap-2 items-center text-[16px] text-blck-600 hover:text-blue-400"
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
