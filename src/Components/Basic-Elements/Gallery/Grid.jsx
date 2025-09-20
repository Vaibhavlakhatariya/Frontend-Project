import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../ThemeContext/ThemeContextProvider";

const Gridgallery = () => {
  const {darkMode, stripe } = useContext(ThemeContext);

  const [gridData, setGridData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/basic-elements/gallery")
      .then((res) => res.json())
      .then((data) => {
        const findById = (obj, id) => {
          let result = null;
          const search = (o) => {
            if (typeof o !== "object" || o === null) return;
            for (let key in o) {
              if (key === "id" && o[key] === id) {
                result = o;
                return;
              }
              if (typeof o[key] === "object") {
                search(o[key]);
                if (result) return;
              }
            }
          };
          search(obj);
          return result;
        };

        const gridGalleryContent = findById(data, 151);

        if (gridGalleryContent) {
          const { headline, text, image } = gridGalleryContent.content;
          setGridData({
            title: headline,
            description: text,
            images: image.map((img) => ({
              url: img.publicUrl,
              alt: img.properties?.alternative || "Gallery Image",
            })),
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching grid gallery data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 flex justify-center items-center bg-white"></div>
    );
  }

  if (!gridData) {
    return (
      <div className="w-full h-64 flex justify-center items-center">
        <p className="text-red-500 text-lg">No grid gallery data found</p>
      </div>
    );
  }

  return (
    <div
      className={`w-full border-b border-gray-200 flex flex-col items-center justify-center mx-auto px-4 pt-10 pb-18 ${
        darkMode === "dark" ? "bg-[#61dcdf]" : "bg-white"
      }`}
    >
      {/* Title Section */}
      <h1
        className={`text-[32px] mt-10 font-bold ${
          darkMode === "dark" ? "text-white" : "text-[var(--secondryClr)]"
        }`}
      >
        {gridData.title}
      </h1>

      <p
        className={`text-center leading-relaxed tracking-wide mx-auto max-w-240 text-[20px] mt-2 ${
          darkMode === "dark" ? "text-white" : "text-[var(--textClr)]"
        }`}
      >
        {gridData.description}
      </p>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 px-0 sm:px-10 md:px-17 lg:px-26 gap-4 mt-12">
        {gridData.images.map((img, index) => (
          <div
            key={index}
            className="border cursor-pointer border-gray-200 w-full overflow-hidden"
          >
            <img
              src={img.url}
              alt={img.alt}
              className="h-full w-full transition-transform duration-500 hover:scale-108"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gridgallery;
