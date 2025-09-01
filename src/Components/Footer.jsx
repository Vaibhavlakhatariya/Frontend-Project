import React, { useEffect, useState } from "react";
import { FaXTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";

// helper to clean bodytext
const stripHtml = (html = "") => html.replace(/<[^>]+>/g, "");

const Footer = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching footer data:", err));
  }, []);

  const footer =
    data?.content?.colPos2?.[0]?.content?.items?.[0]?.contentElements?.[0]
      ?.content;

  const imgUrl =
    footer?.items?.[0]?.contentElements?.[0]?.content?.gallery?.rows?.["1"]
      ?.columns?.["1"]?.publicUrl;

  const content =
    footer?.items?.[0]?.contentElements?.[1]?.content?.bodytext || "";

  const about = footer?.items?.[1]?.contentElements?.[0]?.content;
  const resources = footer?.items?.[2]?.contentElements?.[0]?.content;
  const form =
    footer?.items?.[3]?.contentElements?.[0]?.content?.form_additional;

  return (
    <footer className="bg-[#f8f9fc] text-[#617798] text-base">
      {/* 🔹 Top nav */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* nav links */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-5 md:gap-8 font-medium">
            {data?.page?.footerNavigation?.map((ele, index) => (
              <a
                key={index}
                href={ele.link}
                className="relative hover:text-blue-500 transition-colors duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-[-3px] 
                  after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300
                  hover:after:w-full"
              >
                {ele.title}
              </a>
            ))}
          </nav>

          {/* social icons */}
          <div className="flex justify-center gap-6 text-lg">
            <a href="#">
              <FaXTwitter className="text-[#0f172a] hover:text-blue-500 transition" />
            </a>
            <a href="#">
              <FaFacebookF className="text-[#0f172a] hover:text-blue-500 transition" />
            </a>
            <a href="#">
              <FaLinkedinIn className="text-[#0f172a] hover:text-blue-500 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Middle footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-10 border-b border-gray-200">
        {/* logo + text */}
        <div className="lg:col-span-2">
          {imgUrl && <img src={imgUrl} alt="logo" className="h-10 mb-6" />}
          <p className="text-lg  leading-relaxed max-w-xs text-[#617798]">
            {stripHtml(content)}
          </p>
        </div>

        {/* About */}
        <div>
          <h3 className="text-[#61dcdf] font-bold mb-5 text-1xl uppercase tracking-wider">
            {about?.header}
          </h3>
          <ul className="space-y-4">
            {about?.menu?.map((ele, index) => (
              <li key={index}>
                <a
                  href={ele.link}
                  className="relative text-[16px] text-[#617798] hover:text-blue-500 transition-colors duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-[-2px] 
                  after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300
                  hover:after:w-full"
                >
                  {ele.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-[#61dcdf] font-bold mb-5 text-1xl uppercase tracking-wider">
            {resources?.header}
          </h3>
          <ul className="space-y-4">
            {resources?.menu?.map((ele, index) => (
              <li key={index}>
                <a
                  href={ele.link}
                  className="relative text-[16px] text-[#617798] hover:text-blue-500 transition-colors duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-[-2px] 
                  after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300
                  hover:after:w-full"
                >
                  {ele.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-3">
          <h3 className="text-[#61dcdf] font-bold mb-3 text-sm uppercase tracking-wider">
            {form?.header}
          </h3>
          <form className="flex mb-4 max-w-sm">
            <input
              type="email"
              placeholder={
                form?.renderables?.[0]?.renderables?.[0]?.properties
                  ?.fluidAdditionalAttributes?.placeholder
              }
              className="flex-1 border border-gray-300 rounded-l px-3 py-4 text-sm outline-none 
                  "
            />
            <button className="bg-[#4c6fff] text-white px-11  font-medium text-1xl ">
              {form?.renderingOptions?.submitButtonLabel}
            </button>
          </form>
          <label className="flex items-start gap-2 text-sm font-medium leading-snug text-[#617798]">
            <input type="checkbox" className="mt-1 accent-blue-700" />
            {form?.renderables?.[0]?.renderables?.[1]?.label}
          </label>
        </div>
      </div>

      {/* 🔹 Copyright */}
      <div className="text-center py-6 text-[16px] text-[#6b7280]">
        {data?.page?.constants?.ns_basetheme?.copyright?.value}
      </div>
    </footer>
  );
};

export default Footer;
