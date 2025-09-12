import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [hero, setHero] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((data) => {
        const heroData =
          data?.content?.colPos0?.[0]?.content?.items?.[0]?.contentElements?.[0]
            ?.content?.items || [];
        setHero(heroData);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!hero) return;
    const rotatorBlock =
      hero[0]?.contentElements?.[0]?.content?.rotatorBlock || [];
    if (rotatorBlock.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatorBlock.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [hero]);

  if (!hero) return <p>Loading...</p>;

  const rotatorBlock =
    hero[0]?.contentElements?.[0]?.content?.rotatorBlock || [];

  const bodyText = hero[0]?.contentElements?.[1]?.content?.bodytext || "";

  // Extract "website today" only from bodyText
  // const websiteTodayMatch = bodyText.match(/<h1.*?>(.*?)<\/h1>/);
  // const websiteToday = websiteTodayMatch ? websiteTodayMatch[1] : "";

  //  Extract only the <p> subtext separately
  const subtextMatch = bodyText.match(/<p.*?>(.*?)<\/p>/);
  const subtext = subtextMatch ? subtextMatch[0] : "";

  const buttonText = hero[0]?.contentElements?.[2]?.content?.bodytext || "";
  const heroImage =
    hero[1]?.contentElements?.[0]?.content?.gallery?.rows?.["1"]?.columns?.["1"]
      ?.publicUrl;

  return (
    <section className="bg-[var(--secondryClr)]  text-white py-40 px-4 sm:px-8 md:px-16 lg:px-25 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-3">
            Build a{" "}
            <span className="relative inline-block text-white-400">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatorBlock[index]?.rotatorText}
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.9, 1],
                  }}
                  className="inline-block"
                >
                  {rotatorBlock[index]?.rotatorText}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            {/* "website today" inline */}
            <br />
            <span className="relative mt-4 inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="relative z-10">website today</span>
              <span className="absolute left-0 bottom-1 w-full h-3 p-2.5 sm:h-4 bg-gradient-to-r from-[var(--primaryClr)] to-blue-300 z-0"></span>
            </span>
          </h1>

          {/* Subtext (separate paragraph) */}
          <div
            className="text-base sm:text-lg md:text-1xl text-white-800 mb-8 sm:mb-10 font-Work Sans"
            dangerouslySetInnerHTML={{ __html: subtext }}
          />

          {/* Button */}
          <a
            href="#"
            className="mt-3 inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 
             text-sm sm:text-base md:text-lg font-semibold text-white 
             bg-gradient-to-r from-[var(--primaryClr)] to-[var(--teritoryClr)] 
             shadow-lg transition-transform transform hover:scale-105"
          >
            {buttonText.replace(/<[^>]+>/g, "")}{" "}
     
            <span className="text-lg">→</span>
          </a>
        </div>

        {/* Right Side */}
        <div className="flex justify-center md:justify-end items-center">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full max-w-[350px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[600px] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
