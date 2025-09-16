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
  const [lang, setLang] = useState(savedData.lang || "EN");
  const [stripe, setStripe] = useState(savedData.stripe || false);
  const [showLang, setShowLang] = useState(savedData.showLang ?? true);
  const [footerTheme, setFooterTheme] = useState(savedData.footerTheme || "medium");
  const [darkMode, setDarkMode] = useState(savedData.darkMode || "light");
  const [showSearch, setShowSearch] = useState(savedData.showSearch ?? true);
  const [navTheme, setNavTheme] = useState(savedData.navTheme || "without-topbar");
  const [isOpen, setIsOpen] = useState(false);

  // Apply theme CSS variables
  useEffect(() => {
    Object.entries(theme).forEach(([key, value]) =>
      document.documentElement.style.setProperty(`--${key}`, value)
    );
    document.body.classList.toggle("boxed", theme.wideWidth === "1200px");
  }, [theme]);

  // Dark mode & stripe toggle
  useEffect(() => {
    document.body.classList.toggle("changeThemes", darkMode === "dark");
    document.body.classList.toggle("stripe-bg", stripe);
  }, [darkMode, stripe]);

  // Change single theme value
  const changeTheme = (key, value) => setTheme((prev) => ({ ...prev, [key]: value }));

  // Reset all settings
  const resetSettings = () => {
    setTheme(defaultTheme);
    setDarkMode("light");
    setStripe(false);
    setShowSearch(true);
    setShowLang(true);
    setNavTheme("without-topbar");
    setFooterTheme("medium");
    setLang("EN");
    localStorage.removeItem("customTheme");
  };

  // Save settings
  const saveSettings = () => {
    const data = { theme, darkMode, stripe, showLang, showSearch, navTheme, footerTheme, lang };
    localStorage.setItem("customTheme", JSON.stringify(data));
    setIsOpen(false); // close sidebar after submit
  };

  return (
    <ThemeContext.Provider
      value={{
        theme, changeTheme,
        darkMode, setDarkMode,
        stripe, setStripe,
        showLang, setShowLang,
        showSearch, setShowSearch,
        lang, setLang,
        navTheme, setNavTheme,
        footerTheme, setFooterTheme,
        isOpen, setIsOpen,
        saveSettings, resetSettings
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
