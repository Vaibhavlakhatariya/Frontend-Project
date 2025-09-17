import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContextProvider";
import { FaCog, FaShoppingCart } from "react-icons/fa";

const Themebar = () => {
  const [toggle, setToggle] = useState(false);
  const {
    navTheme,
    setNavTheme,
    showLang,
    showSearch,
    setShowSearch,
    setShowLang,
    changeTheme,
    theme,
    darkMode,
    setDarkMode,
    stripe,
    setStripe,
    resetSettings,
    saveSettings,
    footerTheme,
    setFooterTheme,
  } = useContext(ThemeContext);

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const res = await fetch("https://t3-reva.t3planet.de/");
        const data = await res.json();
        console.log("Fetched Theme Data:", data);
      } catch (err) {
        console.error("Error fetching theme data:", err);
      }
    };
    fetchThemeData();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    saveSettings();
    setToggle(false); // close sidebar after submit
  };

  return (
    <div className="fixed z-999 tracking-wide top-1/2 left-0 -translate-y-1/2">
      <div className="main flex items-center flex-row-reverse">
        {/* Sidebar Toggle Buttons */}
        <div className="flex pb-19 flex-col">
          {/* Settings Button */}
          <button
            onClick={() => setToggle(!toggle)}
            className="rounded-r-sm mb-[2px] bg-[#002348] text-white py-3 px-3"
          >
            {/* Cog SVG */}
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 640 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
            </svg>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setToggle(!toggle)}
            className="rounded-r-sm mb-[2px] bg-[#002348] text-white py-3 px-3"
          >
            {/* Shopping Cart SVG */}
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 576 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
            </svg>
          </button>
        </div>

        {/* Sidebar Form */}
        <div>
          {toggle && (
            <div className="div bg-[#002348]">
              <form onSubmit={handleForm}>
                <div className="mainfom overflow-y-scroll max-h-screen">
                  <div style={{ padding: "16px 30px 10px" }}>
                    <div className="heading text-[#fff] font-semibold text-[16px] mb-2">
                      <h4>Theme Color</h4>
                    </div>

                    <div className="formdata text-[14px] text-[#f8f8f8d7] font-normal">
                      {/* Colors */}
                      <ColorField
                        label="Primary Color"
                        value={theme.primaryClr}
                        onChange={(v) => changeTheme("primaryClr", v)}
                      />
                      <ColorField
                        label="Secondary Color"
                        value={theme.secondryClr}
                        onChange={(v) => changeTheme("secondryClr", v)}
                      />
                      <ColorField
                        label="Text Color"
                        value={theme.textClr}
                        onChange={(v) => changeTheme("textClr", v)}
                      />
                      <ColorField
                        label="Territory Color"
                        value={theme.teritoryClr}
                        onChange={(v) => changeTheme("teritoryClr", v)}
                      />
                      <ColorField
                        label="Gray Color"
                        value={theme.grayClr}
                        onChange={(v) => changeTheme("grayClr", v)}
                      />

                      {/* Dropdowns */}
                      <div className="singleData mb-3 bg">
                        <h5 className="mb-2">Header Menu</h5>
                        <select
                          value={navTheme}
                          onChange={(e) => setNavTheme(e.target.value)}
                          className="w-full text-black rounded p-1 bg-white py-2 px-2"
                        >
                          <option value="light">Default</option>
                          <option value="dark">Transparent</option>
                          <option value="transparent">Without Topbar</option>
                          <option value="transparent">Full Width</option>
                          <option value="transparent">
                            Full Width Transparent
                          </option>
                          <option value="transparent">
                            Full Width Without Topbar
                          </option>
                        </select>
                      </div>

                      <div className="singleData mb-3">
                        <h5 className="mb-2">Footer Menu</h5>
                        <select
                          value={footerTheme}
                          onChange={(e) => setFooterTheme(e.target.value)}
                          className="w-full text-black rounded p-1 bg-white py-2 px-2"
                        >
                          <option value="large">Large Footer</option>
                          <option value="medium">Medium Footer</option>
                          <option value="small">Small Footer</option>
                        </select>
                      </div>
                      <div className="singleData mb-3">
                        <h5 className="mb-2">Main Font Family</h5>
                        <select
                          value={theme.fontFamily}
                          onChange={(e) =>
                            changeTheme("fontFamily", e.target.value)
                          }
                          className="w-full text-black rounded p-1 bg-white py-2 px-2"
                        >
                          <option value="Work Sans">Work Sans</option>
                          <option value="Playfair">Playfair</option>
                          <option value="Custom">Custom Font</option>
                        </select>

                        {/* Show only if Custom Font is selected */}
                        {theme.fontFamily === "Custom" && (
                          <div className="mt-3 space-y-3 bg-[#f8f8f8] p-3 rounded">
                            <div>
                              <label className="block text-[#CDCBCB] text-sm mb-1">
                                Google Font (Without prefix)
                              </label>
                              <input
                                type="text"
                                className="w-full p-2 text-sm text-[#617798] bg-white border border-[#e7e7e7] rounded"
                                placeholder="?family=Poppins:wght@400;600&display=swap"
                                value={theme.googleFontLink || ""}
                                onChange={(e) =>
                                  changeTheme("googleFontLink", e.target.value)
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-[#CDCBCB] text-sm mb-1">
                                CSS Family (Without `font-family:`)
                              </label>
                              <input
                                type="text"
                                className="w-full p-2 text-sm text-[#617798] bg-white border border-[#e7e7e7] rounded"
                                placeholder="Poppins"
                                value={theme.customFontName || ""}
                                onChange={(e) =>
                                  changeTheme("customFontName", e.target.value)
                                }
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                window.open(
                                  "https://fonts.google.com/",
                                  "_blank"
                                )
                              }
                              className="mt-1 px-3 py-2 flex items-center gap-2 bg-[#4C6FFF] text-white text-sm rounded"
                            >
                              Select From Google Fonts
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Layout Switcher */}
                      <div className="singleData mb-3">
                        <h5 className="mb-2">Layout Switcher</h5>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            value="100%"
                            onClick={(e) =>
                              changeTheme("wideWidth", e.target.value)
                            }
                            className={`px-3 py-1 rounded ${
                              theme.wideWidth === "100%"
                                ? "bg-white text-black"
                                : "bg-black text-white"
                            }`}
                          >
                            Wide
                          </button>
                          <button
                            type="button"
                            value="1200px"
                            onClick={(e) =>
                              changeTheme("wideWidth", e.target.value)
                            }
                            className={`px-2 py-1 rounded ${
                              theme.wideWidth === "1200px"
                                ? "bg-white text-black"
                                : "bg-black text-white"
                            }`}
                          >
                            Boxed
                          </button>
                        </div>
                      </div>

                      <div className="singleData mb-3">
                        <h5 className="mb-2">Background Color</h5>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setDarkMode("light")}
                            className={`px-3 py-1 rounded ${
                              darkMode === "light"
                                ? "bg-white text-black"
                                : "bg-black text-white"
                            }`}
                          >
                            Light
                          </button>
                          <button
                            type="button"
                            onClick={() => setDarkMode("dark")}
                            className={`px-2 py-1 rounded ${
                              darkMode === "dark"
                                ? "bg-white text-black"
                                : "bg-black text-white"
                            }`}
                          >
                            Dark
                          </button>
                        </div>
                      </div>

                      {/* Toggles */}
                      <ToggleField
                        label="Search Type"
                        active={showSearch}
                        onChange={setShowSearch}
                      />
                      <ToggleField
                        label="Language Type"
                        active={showLang}
                        onChange={setShowLang}
                      />
                      <ToggleField
                        label="Page Stripe"
                        active={stripe}
                        onChange={setStripe}
                      />
                    </div>
                  </div>

                  {/* Submit / Reset */}
                  <div
                    className="text-sm flex justify-center items-center gap-3 mb-5 border-t border-white text-white"
                    style={{ padding: "18px 30px 15px" }}
                  >
                    <button
                      type="submit"
                      onClick={onsubmit}
                      className=" px-3 py-1 rounded relative cursor-pointer overflow-hidden border-1 border-white bg-[#4C6FFF] text-white font-medium text-md group"
                    >
                      <span className="relative z-10 transition-colors font-semibold duration-500 group-hover:text-white">
                        Submit
                      </span>
                      <span className="absolute inset-0 bg-[#002348] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
                    </button>

                    {/* Reset button (keeps sidebar open) */}
                    <button
                      type="button"
                      onClick={() => resetSettings()}
                      className=" px-3 py-1 rounded relative cursor-pointer overflow-hidden border-1 border-white bg-[#4C6FFF] text-white font-medium text-md group"
                    >
                      <span className="relative z-10 transition-colors font-semibold duration-500 group-hover:text-white">
                        Reset
                      </span>
                      <span className="absolute inset-0 bg-[#002348] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ColorField = ({ label, value, onChange }) => (
  <div className="singleData mb-3">
    <h5 className="mb-2">{label}</h5>
    <div className="flex bg-white rounded-sm items-center">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-[20px] h-[23px] me-2 rounded-md"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 py-2 px-2 border-none rounded-r-sm text-[#000]"
      />
    </div>
  </div>
);

const ToggleField = ({ label, active, onChange }) => (
  <div className="singleData mb-3">
    <h5 className="mb-2">{label}</h5>
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-3 py-1 rounded ${
          active ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        Show
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-3 py-1 rounded ${
          !active ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        Hide
      </button>
    </div>
  </div>
);

export default Themebar;
