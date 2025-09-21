import React, { useEffect, useState } from "react";
import { ThemeContext } from "../../../ThemeContext/ThemeContextProvider";
import { FaArrowRight } from "react-icons/fa";
import { GiWhiteBook } from "react-icons/gi";

const Card1 = () => {
  const { darkMode } = React.useContext(ThemeContext);

  // LocalStorage colors set by ThemeBar
  const primaryColor = localStorage.getItem("color") || "#4c6fff"; // main theme color
  const textColor = localStorage.getItem("tcolor") || "#555"; // secondary text color

  const [title, setTitle] = useState("");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Recursive search helper
  const findById = (obj, id) => {
    if (!obj || typeof obj !== "object") return null;
    if (obj.id === id) return obj;
    for (const key in obj) {
      const found = findById(obj[key], id);
      if (found) return found;
    }
    return null;
  };

  useEffect(() => {
    fetch(
      "https://t3-reva.t3planet.de/elements/infographic-elements/pricing-plans"
    )
      .then((res) => res.json())
      .then((data) => {
        const pricingData = findById(data, 155);
        if (pricingData?.content) {
          setTitle(pricingData.content.header || "Modern Pricing Plans");
          setPlans(pricingData.content.pricingPlans || []);
        }
      })
      .catch((err) => console.error("Error fetching pricing plans:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center bg-white" />
    );
  }

  return (
    <section className="w-full flex flex-col items-center px-4 lg:px-8 py-12">
      {/*  Title */}
      <h1
        // style={{ color: darkMode ? "#fff" : primaryColor }}
        className="text-[38px] font-extrabold text-center mb-12 text-[var(--secondryClr)]"
      >
        {title}
      </h1>

      {/*Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-10 w-full max-w-7xl">
        {plans.map((plan, index) => (
          <div key={index} className="relative flex justify-center w-full">
            {/* Pricing Card */}
            <div className="relative z-10 bg-white border border-gray-300 px-8 py-10 w-full max-w-sm">
              <p className="text-4xl font-bold inline text-[var(--secondryClr)]">
                ${plan.price}
              </p>
              <span className="text-lg text-gray-500">/{plan.period}</span>

              <h2 className="mt-5 font-extrabold text-2xl text-[var(--secondryClr)]">
                {plan.title}
              </h2>

              <p className="mt-4 text-lg text-[var(--textClr)]">
                {plan.description}
              </p>

              <hr className="mt-6 border-gray-200" />

              {/* Features */}
              <div className="pt-4 space-y-2">
                {plan.addItem?.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <svg
                      viewBox="0 0 1024 1024"
                      className="h-5 w-5 text-green-600"
                      fill="currentColor"
                    >
                      <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                    </svg>
                    <p className="text-lg text-[var(--textClr)]">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Background Layer & Button */}
            <div
              className={`absolute w-full max-w-sm bg-gray-100 flex justify-center items-center z-0 ${
                plan.title === "Professional"
                  ? "top-14 h-[460px]"
                  : "top-10 h-[420px]"
              }`}
            >
              {plan.buttonLabel && (
                <a
                  href={plan.buttonLink?.href || "#"}
                  className="group flex items-center gap-3 text-blue-500 font-medium py-2 px-4 mt-auto"
                >
                  {plan.buttonLabel}
                  <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Card1;
