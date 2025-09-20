import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/pagination";
import { ThemeContext } from "../../../ThemeContext/ThemeContextProvider";

const SliderGallery = () => {
  const { darkMode, theme } = useContext(ThemeContext);
  const [sliderData, setSliderData] = useState(null);
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

        const sliderGalleryContent = findById(data, 149);

        if (sliderGalleryContent) {
          const { header, text, image } = sliderGalleryContent.content;
          setSliderData({
            title: header,
            description: text,
            images: image.map((img) => img.publicUrl),
          });
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching slider gallery data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-60">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!sliderData) {
    return (
      <div className="w-full flex justify-center items-center h-60">
        <p>No slider data available</p>
      </div>
    );
  }

  return (
    <div
      className={`w-full flex flex-col items-center justify-center mx-auto py-16 transition-colors duration-500 ${
        darkMode === "dark" ? "bg-[#61dcdf]" : "bg-white"
      }`}
    >
      {/* Title Section */}
      <h1
        className="text-[32px] sm:text-[38px] lg:text-[42px] mt-6 font-bold"
        style={{ color: darkMode === "dark" ? "#fff" : theme.primaryClr }}
      >
        {sliderData.title}
      </h1>

      <p
        className="text-center leading-relaxed tracking-wide mx-auto max-w-3xl text-[18px] mt-3"
        style={{ color: darkMode === "dark" ? "#fff" : theme.textClr }}
      >
        {sliderData.description}
      </p>

      {/* Swiper Slider */}
      <div className="relative h-full mt-10 w-full max-w-7xl">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          centeredSlides
          loop
          navigation
          pagination={{ clickable: true }}
          className="slider-container"
          breakpoints={{
            0: { slidesPerView: 1 },
            994: { slidesPerView: 1.5 },
            1280: { slidesPerView: 1.4 },
          }}
        >
          {sliderData.images.map((img, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center px-3 transition-transform duration-500"
            >
              <div className="relative w-full">
                <img
                  src={img}
                  alt={`Slide ${index}`}
                  className="w-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Styling */}
        <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: ${theme.secondryClr};
            top: 50% !important;
            transform: translateY(-50%);
            background: white;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            z-index: 10;
          }
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: ${theme.secondryClr};
            color: white;
            transform: translateY(-50%) scale(1.1);
          }
          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 18px;
            font-weight: bold;
          }
          .swiper-button-next {
            right: 10%;
          }
          .swiper-button-prev {
            left: 10%;
          }
          .swiper-pagination {
            bottom: -25px !important;
          }
          .swiper-pagination-bullet {
            background: #d1d5db;
            opacity: 1;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            transition: all 0.3s ease;
            margin: 0 6px !important;
          }
          .swiper-pagination-bullet-active {
            background: ${theme.secondryClr};
            transform: scale(1.3);
          }
        `}</style>
      </div>
    </div>
  );
};

export default SliderGallery;
