import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContextProvider";

const decodeHtml = (str) => {
  if (!str) return "";
  const el = document.createElement("textarea");
  el.innerHTML = str;
  return el.value;
};

const toText = (html) => {
  if (!html) return "";
  const el = document.createElement("div");
  el.innerHTML = html;
  return el.textContent || el.innerText || "";
};

const FluidAndResponsive = () => {
  const { darkMode, stripe } = useContext(ThemeContext);
  const [section, setSection] = useState(null);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((r) => r.json())
      .then((json) => {
        const base =
          json?.content?.colPos0?.[10]?.content?.items?.[0]
            ?.contentElements?.[0]?.content;
        setSection(base);
      })
      .catch(console.error);
  }, []);

  if (!section) return <p className="text-center text-gray-500">Loading...</p>;

  const rawBody = decodeHtml(
    section?.items?.[0]?.contentElements?.[0]?.content?.bodytext
  );
  const bodyText = toText(rawBody).replace(/\s+/g, " ").trim();
  const descKey = "No matter what";
  const descPos = bodyText.toLowerCase().indexOf(descKey.toLowerCase());
  const titleText = descPos > -1 ? bodyText.slice(0, descPos).trim() : bodyText;
  const description =
    descPos > -1
      ? bodyText.slice(descPos).trim()
      : "No matter what content you add, your website will look great on mobile and tablet devices.";

  const hiMatch = titleText.match(/fluid\s*&\s*responsive/i);
  const beforeHi = hiMatch && titleText.slice(0, hiMatch.index).trimEnd();
  const hiText = hiMatch ? hiMatch[0] : "";
  const afterHi =
    hiMatch && titleText.slice(hiMatch.index + hiMatch[0].length).trimStart();

  const features =
    section?.items?.[0]?.contentElements?.[1]?.content?.items || [];

  const laptop =
    section?.items?.[1]?.contentElements?.[0]?.content?.image?.[0]?.publicUrl;
  const mobile =
    section?.items?.[1]?.contentElements?.[0]?.content?.image?.[1]?.publicUrl;

  return (
    <section
      className={`relative py-16 md:py-24 transition-colors duration-500 ${
        darkMode === "dark" ? "bg-[#b0eeef]" : "bg-white"
      }`}
    >
      {/* Stripe background */}
      {stripe && darkMode === "light" && (
        <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-0">
          <div className="absolute top-0 bottom-0 left-[393px] w-px bg-gray-200"></div>
          <div className="absolute top-0 bottom-0 right-[470px] w-[0.5px] bg-gray-200"></div>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center px-6 md:px-8 relative">
        {/* LEFT */}
        <div className="max-w-[520px] mx-auto lg:mx-0 text-center lg:text-left">
          <h2
            className={`text-[26px] md:text-[32px] lg:text-[38px] font-extrabold leading-snug`}
            style={{
              color: darkMode === "dark" ? "#fff" : "#61dcdf",
            }}
          >
            {beforeHi && <span>{beforeHi} </span>}
            {hiText && (
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, ${
                    darkMode === "dark" ? "#4c6fff" : "#4c6fff"
                  }, ${darkMode === "dark" ? "#f43fe2" : "#f43fe2"})`,
                }}
              >
                {hiText}
              </span>
            )}{" "}
            {afterHi}
          </h2>

          <p
            className="mt-4 text-base md:text-lg leading-7"
            style={{
              color: darkMode === "dark" ? "#ffffff" : "#617798",
            }}
          >
            {description}
          </p>

          {/* Features */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            {features.map((item, idx) => {
              const ele = item?.contentElements?.[0];
              const icon = ele?.content?.icon?.[0]?.publicUrl;
              const title = decodeHtml(ele?.content?.header || "");
              const text = toText(decodeHtml(ele?.content?.text || ""));
              return (
                <div
                  key={idx}
                  className={`py-5 px-2 rounded-md transition-all duration-300 ${
                    darkMode === "dark"
                      ? "bg-[#fff]"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  {icon && (
                    <img
                      src={icon}
                      alt=""
                      className="w-11 h-11 mx-auto sm:mx-0 mb-4"
                    />
                  )}
                  <h3
                    className="text-[24px] md:text-2xl font-medium"
                    style={{
                      color: darkMode === "dark" ? "#61dcdf" : "#4c6fff",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    className="mt-2 text-sm md:text-base leading-6 max-w-[160px] mx-auto sm:mx-0"
                    style={{
                      color: darkMode === "dark" ? "#ffffff/70" : "#617798",
                    }}
                  >
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex flex-col items-center lg:items-start justify-center lg:justify-start mt-10 lg:mt-0">
          {laptop && (
            <img
              src={laptop}
              alt="Laptop"
              className="w-[90%] sm:w-[420px] lg:w-[500px] rounded-2xl shadow-xl"
            />
          )}

          {mobile && (
            <img
              src={mobile}
              alt="Mobile"
              className="lg:absolute mx-auto mt-2 lg:mt-0 lg:-top-[59px] lg:left-27 transform lg:-translate-x-1/2 h-auto w-1/2 max-w-[225px]"
              style={{
                backgroundColor: darkMode === "dark" ? "#121212" : "#ffffff",
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default FluidAndResponsive;
