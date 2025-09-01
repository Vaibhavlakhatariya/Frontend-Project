import React, { useEffect, useState } from "react";

/* --- Tiny Helpers --- */
const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");
const nbspFix = (s = "") => s.replace(/&nbsp;/gi, " ").trim();

/* --- Simple Counter Animation --- */
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

  const header = base?.items?.[0]?.contentElements?.[0]?.content?.bodytext || "";
  const counters =
    base?.items?.[0]?.contentElements?.[1]?.content?.items || [];

  const imageUrl =
    base?.items?.[1]?.contentElements?.[0]?.content?.gallery?.rows?.["1"]
      ?.columns?.["1"]?.publicUrl || "";

  const cleanHeader = nbspFix(stripHtml(header));
  const heading = cleanHeader.split("Each shortcode")[0];
  const paragraph = cleanHeader.split("imagine them.")[1];

  return (
    <section className="px-3 py-10 md:px-8 lg:px-12 bg-gray-200/60">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-snug text-[#61dcdf]">
            {heading}
          </h2>

          {paragraph && (
            <p className="text-lg leading-8 font-sans mt-5 text-[#617798]">
              {paragraph}
            </p>
          )}

          {/* Counters */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {counters.map((item, i) =>
              item?.contentElements?.map((el, j) => {
                const c = el.content;
                if (!c?.counterData) return null;
                return (
                  <div key={i + "-" + j} className="text-center sm:text-left">
                    <h3 className="text-5xl md:text-6xl font-bold text-[#61dcdf]">
                      <CountUp to={Number(c.counterData)} />
                      {c.counterAppendeg}
                    </h3>
                    <p className="text-xl text-[#617798] mt-3">{c.header}</p>
                    <p className="text-gray-600 mt-1">
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
              className="w-full h-auto rounded-xl shadow-md"
            />
          ) : (
            <div className="w-full aspect-video bg-gray-200 rounded-xl" />
          )}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
