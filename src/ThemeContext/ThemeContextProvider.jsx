import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const defaultTheme = {
  primaryClr: "#4c6fff",
  secondryClr: "#61dcdf",
  textClr: "#617798",
  teritoryClr: "#f43fe2",
  grayClr: "#cfcdcd42",
  fontFamily: "Work Sans, sans-serif",
  wideWidth: "100%",
};

const ThemeContextProvider = ({ children }) => {
  const savedData = JSON.parse(localStorage.getItem("customTheme")) || {};

  const [theme, setTheme] = useState({ ...defaultTheme, ...savedData.theme });
  const [darkMode, setDarkMode] = useState(savedData.darkMode || "light");
  const [stripe, setStripe] = useState(savedData.stripe || false);
  const [showSearch, setShowSearch] = useState(savedData.showSearch ?? true);
  const [showLang, setShowLang] = useState(savedData.showLang ?? true);
  const [navTheme, setNavTheme] = useState(savedData.navTheme || "without-topbar");
  const [footerTheme, setFooterTheme] = useState(savedData.footerTheme || "medium");
  const [lang, setLang] = useState(savedData.lang || "EN");

  // update theme colors & layout
  useEffect(() => {
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });

    document.body.classList.toggle("boxed", theme.wideWidth === "1200px");
  }, [theme]);

  // handle dark mode & stripe background
  useEffect(() => {
    document.body.classList.toggle("changeThemes", darkMode === "dark");
    document.body.classList.toggle("stripe-bg", stripe);
  }, [darkMode, stripe]);

  // update theme values
  const changeTheme = (key, value) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
  };

  // save all settings
  const saveSettings = () => {
    localStorage.setItem(
      "customTheme",
      JSON.stringify({ theme, darkMode, stripe, showLang, showSearch, navTheme, footerTheme, lang })
    );
  };

  // reset to default
  const resetSettings = () => {
    setTheme(defaultTheme);
    setDarkMode("light");
    setStripe(false);
    localStorage.removeItem("customTheme");
  };

  return (
    <ThemeContext.Provider
      value={{
        changeTheme,
        theme,
        darkMode,
        setDarkMode,
        stripe,
        setStripe,
        saveSettings,
        resetSettings,
        showLang,
        setShowLang,
        showSearch,
        setShowSearch,
        lang,
        setLang,
        navTheme,
        setNavTheme,
        footerTheme,
        setFooterTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
