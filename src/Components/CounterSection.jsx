import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContextProvider";

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");
const nbspFix = (s = "") => s.replace(/&nbsp;/gi, " ").trim();

const CountUp = ({ to = 0, duration = 1800 }) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const animate = (t) => {
      const progress = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(to * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  return <span>{val}</span>;
};

const CounterSection = () => {
  const [data, setData] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  if (!data) {
    return (
      <p
        className={`text-center text-lg mt-10 transition-colors duration-500 ${
          darkMode === "dark" ? "text-white" : "text-gray-500"
        }`}
      >
        Loading...
      </p>
    );
  }

  const base =
    data?.content?.colPos0?.[6]?.content?.items?.[0]?.contentElements?.[0]
      ?.content;

  const header =
    base?.items?.[0]?.contentElements?.[0]?.content?.bodytext || "";
  const counters = base?.items?.[0]?.contentElements?.[1]?.content?.items || [];

  const imageUrl =
    base?.items?.[1]?.contentElements?.[0]?.content?.gallery?.rows?.["1"]
      ?.columns?.["1"]?.publicUrl || "";

  const cleanHeader = nbspFix(stripHtml(header));
  const paragraph = cleanHeader.includes("Each shortcode")
    ? cleanHeader.split("imagine them.")[1]?.trim()
    : "";

  return (
    <section
      className={`py-24 px-6 sm:px-12 lg:px-20 transition-colors duration-500 ${
        darkMode === "dark" ? "bg-[#b0eeef]" : "bg-[var(--grayClr)]"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Side */}
        <div className="flex flex-col">
          {/* Heading */}
          <h2
            className={`text-[36px] sm:text-[42px] lg:text-[48px] font-extrabold leading-[1.2] ${
              darkMode === "dark" ? "text-white" : "text-[var(--secondryClr)]"
            }`}
          >
            Over{" "}
            <span className="bg-gradient-to-r from-[var(--primaryClr)] to-[var(--teritoryClr)] bg-clip-text text-transparent">
              39+ Elements
            </span>
            <br />
            Build your pages
            <br />
            just as <span className="ml-1">you imagine</span>
            <br />
            them.
          </h2>

          {/* Paragraph */}
          {paragraph && (
            <p
              className={`text-[18px] sm:text-[19px] mt-6 max-w-xl leading-relaxed transition-colors duration-500 ${
                darkMode === "dark" ? "text-white" : "text-[var(--textClr)]"
              }`}
            >
              {paragraph}
            </p>
          )}

          {/* Counters */}
          <div className="mt-14 flex flex-wrap gap-x-20 gap-y-12">
            {counters.map((item, i) =>
              item?.contentElements?.map((el, j) => {
                const c = el.content;
                if (!c?.counterData) return null;
                return (
                  <div key={i + "-" + j} className="min-w-[140px]">
                    <h3
                      className={`text-[42px] sm:text-[48px] font-extrabold transition-colors duration-500 ${
                        darkMode === "dark"
                          ? "text-white"
                          : "text-[var(--secondryClr)]"
                      }`}
                    >
                      <CountUp to={Number(c.counterData)} />
                      {c.counterAppendeg}
                    </h3>
                    <p
                      className={`text-lg font-semibold mt-1 transition-colors duration-500 ${
                        darkMode === "dark"
                          ? "text-white"
                          : "text-[var(--textClr)]"
                      }`}
                    >
                      {c.header}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="flex justify-center lg:justify-end">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Counter Section"
              className="w-full max-w-[620px] rounded-2xl shadow-xl object-cover"
            />
          ) : (
            <div
              className={`w-full aspect-video rounded-xl transition-colors duration-500 ${
                darkMode === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
