import React, { useEffect, useState } from "react";

/* --- Helpers --- */
const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");
const nbspFix = (s = "") => s.replace(/&nbsp;/gi, " ").trim();

/* --- Counter Animation --- */
const CountUp = ({ to = 0, duration = 1800 }) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const animate = (t) => {
      const progress = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
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

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  if (!data) {
    return (
      <p className="text-center text-lg text-gray-500 mt-10">Loading...</p>
    );
  }

  /* --- Extract Section Data --- */
  const base =
    data?.content?.colPos0?.[6]?.content?.items?.[0]?.contentElements?.[0]
      ?.content;

  const header =
    base?.items?.[0]?.contentElements?.[0]?.content?.bodytext || "";
  const counters =
    base?.items?.[0]?.contentElements?.[1]?.content?.items || [];

  const imageUrl =
    base?.items?.[1]?.contentElements?.[0]?.content?.gallery?.rows?.["1"]
      ?.columns?.["1"]?.publicUrl || "";

  // Clean text
  const cleanHeader = nbspFix(stripHtml(header));
  const headingMain = "Over"; // plain
  const headingGradient = "39+ Elements"; // gradient
  const subHeading = "Build your pages just as you imagine them.";
  const paragraph = cleanHeader.includes("Each shortcode")
    ? cleanHeader.split("imagine them.")[1]?.trim()
    : "";

  return (
    <section className="px-4 py-20 md:px-10 lg:px-16 bg-[#cfcdcd42]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left Side */}
        <div>
          <h2 className="text-[42px] md:text-5xl font-extrabold leading-snug text-[#61dcdf]">
            {headingMain}{" "}
            <span className="bg-gradient-to-r from-[#4c6fff] to-[#f43fe2] bg-clip-text text-transparent">
              {headingGradient}
            </span>{" "}
            {subHeading}
          </h2>

          {paragraph && (
            <p className="text-[18px] md:text-xl text-[#617798] mt-5 max-w-lg">
              {paragraph}
            </p>
          )}

          {/* Counters */}
          <div className="mt-10 grid grid-cols-2 gap-8">
            {counters.map((item, i) =>
              item?.contentElements?.map((el, j) => {
                const c = el.content;
                if (!c?.counterData) return null;
                return (
                  <div key={i + "-" + j}>
                    <h3 className="text-4xl md:text-5xl font-bold text-[#61dcdf]">
                      <CountUp to={Number(c.counterData)} />
                      {c.counterAppendeg}
                    </h3>
                    <p className="text-[24px] font-semibold text-[#617798] mt-2">
                      {c.header}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {nbspFix(stripHtml(c.bodytext))}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side (Image) */}
        <div>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Counter Section"
              className="w-full h-auto  shadow-xl"
            />
          ) : (
            <div className="w-full aspect-video bg-gray-200 rounded-t-2xl" />
          )}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
