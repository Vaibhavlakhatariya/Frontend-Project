import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CardSection = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("https://t3-reva.t3planet.de/");
        const data = await res.json();

        // Flatten all blocks → items → contentElements
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

  if (!cards.length) {
    return (
      <p className="text-center text-xl text-gray-500 mt-10">Loading...</p>
    );
  }

  return (
    <div className="h-full grid grid-cols-1 mb-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-4 py-4 w-full">
      {cards.map((card, index) => (
        <Link
          key={index}
          to={card.link}
          className="h-150 md:h-100 lg:h-95 group mb-19 flex gap-4 justify-center relative items-center text-center flex-col w-full p-10 xl:p-8 bg-[#cdcbcb]/20 cursor-pointer transition duration-200 ease-in hover:bg-white"
        >
          <img src={card.imgUrl} className="h-110 w-110" alt={card.title} />
          <div className="flex mt-3 md:mt-1 justify-center gap-1 items-center hover:text-blue-500">
            <p className="text-sm">{card.title}</p>
            <span className="transition group-hover:translate-x-2">
              <FaArrowRight />
            </span>
          </div>
          <div className="absolute bottom-0 h-[2px] bg-blue-600 w-85 origin-center scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></div>
        </Link>
      ))}
    </div>
  );
};

export default CardSection;
