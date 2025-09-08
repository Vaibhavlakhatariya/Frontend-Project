import React, { useEffect, useState } from "react";

const FeaturesCard = () => {
  const [data, setData] = useState(null);

  // ✅ Fetch APIgit 
  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/") 
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const base = data?.content?.colPos0?.[12]?.content?.items?.[0];
  const box1 = base?.contentElements?.[1]?.content?.items;
  const box2 = base?.contentElements?.[2]?.content?.items;
  const box3 = base?.contentElements?.[3]?.content?.items;

  const renderBox = (boxes) =>
    boxes?.map((ele, index) => (
      <div className="px-3 mt-6 w-full" key={index}>
        {ele?.contentElements?.map((e, i) => (
          <div
            key={i}
            className="bg-white  shadow-sm p-6 h-full flex flex-col sm:flex-row sm:items-start sm:gap-6 transition hover:shadow-md"
          >
            {/* Icon */}
            <div className="flex-shrink-0 h-7 w-7">
              <img
                src={e?.content?.icon?.[0]?.publicUrl}
                className=" sm:w-10 sm:h-10 mb-4 sm:mb-0"
                alt=""
              />
            </div>
            {/* Content */}
            <div>
              <h3 className="text-[24px] font-semibold text-[var(--secondryClr)] mb-[20px]">
                {e?.content?.header}
              </h3>
              <p className="text-[var(--textClr)] text-[20px] leading-relaxed">
                {e?.content?.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    ));

  return (
    <div className="bg-[var(--grayClr)]">
      <div className="max-w-7xl mx-auto px-3">
        {/* Title */}
        <div className="pt-24 pb-12 text-center">
          {/* Gradient Heading */}
          <h2 className="text-[42px] text-[var(--secondryClr)] font-bold">
            Packed with even <span className=" bg-gradient-to-r  from-[#4c6fff] to-[#9e43e39c] text-transparent bg-clip-text"> more features</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-[var(--textClr)] text-[19px]  mx-auto">
            T3Reva is equipped with the best features. <br /> Building your own website
            is easier than ever.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 pb-16">
          {renderBox(box1)}
          {renderBox(box2)}
          {renderBox(box3)}
        </div>
      </div>
    </div>
  );
};

export default FeaturesCard;
