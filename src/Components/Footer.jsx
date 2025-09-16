import React, { useEffect, useState, useContext } from "react";
import { FaXTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { ThemeContext } from "../ThemeContext/ThemeContextProvider";

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching footer data:", err));
  }, []);

  // Helper to clean HTML
  const stripHtml = (html = "") => html.replace(/<[^>]+>/g, "");

  // Extract footer data safely
  const footer =
    data?.content?.colPos2?.[0]?.content?.items?.[0]?.contentElements?.[0]
      ?.content;

  // Logo
  const logoUrl =
    footer?.items?.[0]?.contentElements?.[0]?.content?.gallery?.rows?.["1"]
      ?.columns?.["1"]?.publicUrl;

  // Footer description
  const contentText =
    footer?.items?.[0]?.contentElements?.[1]?.content?.bodytext || "";

  const menuItems = footer?.items
    ?.slice(1, footer.items.length - 1)
    .map((item) => item.contentElements?.[0]?.content)
    .filter(Boolean);

  // Newsletter form
  const form = footer?.items?.[footer.items.length - 1]?.contentElements?.[0]
    ?.content?.form_additional;

  // Social icons
  const socialIcons = [
    { icon: <FaXTwitter />, link: "#" },
    { icon: <FaFacebookF />, link: "#" },
    { icon: <FaLinkedinIn />, link: "#" },
  ];

  // Shared link style
  const linkClasses = `relative text-[15px] transition-colors duration-300
    after:content-[''] after:absolute after:left-0 after:bottom-[-2px] 
    after:w-0 after:h-[2px] after:bg-[var(--primaryClr)] after:transition-all after:duration-300
    hover:after:w-full`;

  return (
    <footer
      className={`transition-colors duration-500 ${
        darkMode === "dark"
          ? "bg-[#61dcdf] text-white"
          : "bg-white text-[var(--textClr)]"
      } text-[15px]`}
    >
      {/* 🔹 Top nav */}
      <div
        className={`border-b ${
          darkMode === "dark" ? "border-[#2a2a3a]" : "border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Nav links */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-6">
            {data?.page?.footerNavigation?.map((ele, i) => (
              <a
                key={i}
                href={ele.link}
                className={`${linkClasses} ${
                  darkMode === "dark"
                    ? "text-white/70 hover:text-[var(--primaryClr)]"
                    : "text-[var(--textClr)] hover:text-[var(--primaryClr)]"
                }`}
              >
                {ele.title}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex justify-center gap-5 text-lg">
            {socialIcons.map((social, i) => (
              <a
                key={i}
                href={social.link}
                className={`transition ${
                  darkMode === "dark"
                    ? "text-white/70 hover:text-[var(--primaryClr)]"
                    : "text-[#0f172a] hover:text-[var(--primaryClr)]"
                }`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/*Middle footer */}
      <div
        className={`max-w-7xl mx-auto px-6 py-12 
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 
        border-b ${
          darkMode === "dark" ? "border-[#2a2a3a]" : "border-gray-200"
        }`}
      >
        {/* Logo & description */}
        <div className="lg:col-span-2">
          {logoUrl && <img src={logoUrl} alt="logo" className="h-8 mb-5" />}
          <p
            className={`text-[18px] leading-relaxed max-w-xs ${
              darkMode === "dark" ? "text-white/70" : "text-[var(--textClr)]"
            }`}
          >
            {stripHtml(contentText)}
          </p>
        </div>

        {/* Dynamic menus */}
        {menuItems?.map((menu, i) => (
          <div key={i} className="sm:col-span-1">
            <h3
              className={`font-bold mb-4 text-[18px] ${
                darkMode === "dark"
                  ? "text-white"
                  : "text-[var(--secondryClr)]"
              }`}
            >
              {menu.header}
            </h3>
            <ul className="space-y-2">
              {menu.menu?.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.link}
                    className={`${linkClasses} ${
                      darkMode === "dark"
                        ? "text-white/70 hover:text-[var(--primaryClr)]"
                        : "text-[var(--textClr)] hover:text-[var(--primaryClr)]"
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter Form */}
        {form && (
          <div className="md:col-span-3 lg:col-span-2">
            <h3
              className={`font-bold mb-3 text-[18px] ${
                darkMode === "dark"
                  ? "text-white"
                  : "text-[var(--secondryClr)]"
              }`}
            >
              {form.header}
            </h3>
            <form className="flex flex-col sm:flex-row gap-3 mb-3 max-w-sm">
              <input
                type="email"
                placeholder={
                  form.renderables?.[0]?.renderables?.[0]?.properties
                    ?.fluidAdditionalAttributes?.placeholder
                }
                className={`flex-1 border px-3 py-3 text-[15px] outline-none ${
                  darkMode === "dark"
                    ? "border-[#2a2a3a] bg-white text-[#0f172a]"
                    : "border-gray-300 bg-white text-[15px]"
                }`}
              />
              <button
                className={`px-6 py-3 text-[15px] font-semibold transition ${
                  darkMode === "dark"
                    ? "bg-gradient-to-r from-[var(--primaryClr)] to-[var(--teritoryClr)] text-white hover:opacity-90"
                    : "bg-[var(--primaryClr)] text-white hover:bg-[var(--primaryClr)]"
                }`}
              >
                {form.renderingOptions?.submitButtonLabel}
              </button>
            </form>
            <label
              className={`flex items-start gap-2 text-[14px] ${
                darkMode === "dark"
                  ? "text-white/70"
                  : "text-[var(--textClr)]"
              }`}
            >
              <input
                type="checkbox"
                className="mt-1"
                style={{ accentColor: "var(--primaryClr)" }}
              />
              {form.renderables?.[0]?.renderables?.[1]?.label}
            </label>
          </div>
        )}
      </div>

      {/*  Copyright */}
      <div
        className={`text-center py-5 text-[15px] ${
          darkMode === "dark" ? "text-white/70" : "text-[var(--textClr)]"
        }`}
      >
        {data?.page?.constants?.ns_basetheme?.copyright?.value}
      </div>
    </footer>
  );
};

export default Footer;
