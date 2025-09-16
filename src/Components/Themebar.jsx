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
            <FaCog size={17} />
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setToggle(!toggle)}
            className="rounded-r-sm mb-[2px] bg-[#002348] text-white py-3 px-3"
          >
            <FaShoppingCart size={17} />
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
                          <option value="Roboto">Playfair</option>
                          <option value="Poppins">Custom</option>
                        </select>
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
