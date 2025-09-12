import React, { useContext } from "react";
import { Check } from "lucide-react";
import { ThemeContext } from "../ThemeContext/ThemeContextProvider";

const features = [
  {
    image:
      "https://t3-reva.t3planet.com/fileadmin/ns_theme_t3reva/feature_box/feature_box_1.png",
    title: "Multipurpose Template",
    description:
      "Put your products and deals in the spotlight. T3Reva has a simple store design that will fit any purpose.",
    points: ["Lifetime free updates", "Unlimited colors", "Translatable ready"]
  },
  {
    image:
      "https://t3-reva.t3planet.com/fileadmin/ns_theme_t3reva/feature_box/feature_box_2.png",
    title: "Built with React Js & Next Js",
    description:
      "Put your products and deals in the spotlight. T3Reva has a simple store design that will fit any purpose.",
    points: ["Browser compatibility", "Rich typography", "Parallax effects"]
  },
  {
    image:
      "https://t3-reva.t3planet.com/fileadmin/ns_theme_t3reva/feature_box/feature_box_3.png",
    title: "Unique portfolio styles",
    description:
      "Impress your audience with fully responsive portfolios. Choose between 5+ portfolio layouts.",
    points: ["Grid View", "Timeline View", "Isotope View"]
  }
];

const PreMadeLayoutsStatic = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <section
      className={`py-20 transition-colors duration-500 ${
        darkMode === "dark" ? "bg-[#61dcdf]" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Header */}
        <h2 className="md:text-4xl font-bold mb-4 leading-snug">
          <span
            className={`text-[42px] ${
              darkMode === "dark" ? "text-white" : "text-[var(--secondryClr)]"
            }`}
          >
            Custom{" "}
            <span className="text-[42px] bg-gradient-to-r from-[var(--primaryClr)] via-[var(--teritoryClr)] to-pink-500 text-transparent bg-clip-text">
              pre-made layouts{" "}
            </span>
            for
            <br />
          </span>
          <span
            className={`text-[42px] ${
              darkMode === "dark" ? "text-white" : "text-[var(--secondryClr)]"
            }`}
          >
            {" "}
            Corporate, Consulting & More.
          </span>
        </h2>

        <p
          className={`mb-20 max-w-2xl mx-auto text-base text-[18px] leading-relaxed ${
            darkMode === "dark" ? "text-white/70" : "text-[var(--textClr)]"
          }`}
        >
          Speed up your site creation and create an entire website <br />
          with a varied selection of attractive designs.
        </p>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-lg p-6 text-left transition-all duration-300 hover:shadow-sm ${
                darkMode === "dark"
                  ? "bg-[#fff] border border-none"
                  : "bg-white border border-gray-200"
              }`}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-90 object-cover mb-11"
              />
              <h3
                className="text-[24px] font-medium mb-3"
                style={{
                  color: darkMode === "dark" ? "#61dcdf" : "var(--secondryClr)",
                }}
              >
                {feature.title}
              </h3>
              <p
                className="text-[18px] leading-relaxed mb-5"
                style={{
                  color: darkMode === "dark" ? "#ffffff/70" : "var(--textClr)",
                }}
              >
                {feature.description}
              </p>

              <ul className="space-y-5">
                {feature.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[16px] font-medium"
                    style={{
                      color: darkMode === "dark" ? "#ffffff/70" : "var(--textClr)",
                    }}
                  >
                    <Check
                      className="w-5 h-5 mt-0.5"
                      style={{
                        color: darkMode === "dark" ? "#61dcdf" : "var(--primaryClr)",
                      }}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreMadeLayoutsStatic;
