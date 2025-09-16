import React, { useEffect, useState, useContext } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext/ThemeContextProvider";

const CardSection = () => {
  const [cards, setCards] = useState([]);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("https://t3-reva.t3planet.de/");
        const data = await res.json();

        const allCards = Object.values(data.content || {})
          .flatMap((blocks) => blocks)
          .flatMap((block) => block.content?.items || [])
          .flatMap((item) => item.contentElements || [])
          .filter((el) => el.type === "mask_ns_content_box")
          .map((el) => ({
            imgUrl: el.content?.icon?.[0]?.publicUrl || "",
            title: el.content?.contentLinkText || "",
            link: el.content?.contentLink?.href || "#",
          }));

        setCards(allCards);
      } catch (err) {
        console.error("Error fetching cards:", err);
      }
    };

    fetchCards();
  }, []);

  return (
    <div
      className={`h-full relative grid pb-12 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-4 px-4 py-4 w-full transition-colors duration-500 ${
        darkMode === "dark" ? "bg-[#61dcdf]" : "bg-white"
      }`}
    >
      {cards.length === 0 ? (
        <div className="col-span-full w-full h-screen"></div>
      ) : (
        cards.map((card, index) => (
          <Link
            to={card.link}
            key={index}
            className={`relative group mb-18 flex flex-col justify-center items-center text-center w-full p-6 sm:p-8 cursor-pointer transition duration-200 ease-in 
              ${
                darkMode === "dark"
                  ? "bg-[#fff] hover:bg-white text-gray-700"
                  : "bg-gray-100 hover:bg-white text-gray-900"
              }`}
          >
            <img
              src={card.imgUrl}
              className="w-full h-auto object-contain"
              alt={card.title}
            />
            <div
              className={`flex mt-3 justify-center gap-1 items-center transition-colors duration-500 group-hover:text-[var(--primaryClr)] ${
                darkMode === "dark" ? "text-gray-500" : "text-gray-700"
              }`}
            >
              <p className="text-sm">{card.title}</p>
              <span className="transition group-hover:translate-x-2">
                <FaArrowRight />
              </span>
            </div>
            <div className="absolute bottom-0 h-[2px] bg-[var(--primaryClr)] w-[85%] origin-center scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></div>
          </Link>
        ))
      )}
    </div>
  );
};

export default CardSection;
