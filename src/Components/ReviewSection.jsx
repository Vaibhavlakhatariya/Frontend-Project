import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { MdStar } from "react-icons/md";

import "swiper/css";
import "swiper/css/navigation";

const ReviewSection = () => {
  const [data, setData] = useState(null);

  // ✅ Fetch API
  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  const base = data?.content?.colPos0?.[13]?.content?.items?.[0];
  const title = base?.contentElements?.[0]?.content?.bodytext;
  const content = base?.contentElements?.[1]?.content?.reviewBlock;

  return (
    <div className="bg-[#61dcdf]">
      {/* Title */}
      {title && (
        <div
          className="relative pt-24 text-3xl sm:text-4xl md:text-[42px] font-bold pb-4 text-white text-center"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}

      {/* Slider */}
      <div className="relative pt-12 px-3 pb-40 mx-auto max-w-7xl">
        {/* Custom Arrows */}
        <div className="absolute flex gap-5 z-10 top-[85%] left-1/2 -translate-x-1/2 lg:top-[-60px] lg:right-5 lg:left-auto lg:translate-x-0">
          <button className="custom-prev bg-white p-4 sm:p-5 md:p-6 rounded-full shadow-md hover:bg-[#007aff]">
            <img
              src="data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2064%2064%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M54%2030H14.101l15.278-14.552a2%202%200%2010-2.759-2.897L9.172%2029.171A3.978%203.978%200%20008%2032c0%201.068.417%202.073%201.207%202.862l17.414%2016.586c.387.369.883.552%201.379.552a1.999%201.999%200%20001.38-3.448L14.038%2034H54a2%202%200%20000-4z%22%2F%3E%3C%2Fsvg%3E"
              alt="Prev"
              className="w-5 h-5"
            />
          </button>
          <button className="custom-next bg-white p-4 sm:p-5 md:p-6 rounded-full shadow-md hover:bg-[#007aff]">
            <img
              src="data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20512%20512%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M80%20240c-8.8%200-16%207.2-16%2016s7.2%2016%2016%2016h319.7L277%20388.4c-6.4%206.1-6.6%2016.2-.6%2022.6%203.1%203.3%207.4%205%2011.6%205%204%200%207.9-1.5%2011-4.4l139.3-132.7c6.3-6.3%209.7-14.4%209.7-22.9%200-8.6-3.3-16.6-9.4-22.6L299%20100.4c-6.4-6.1-16.5-5.8-22.6.6-6.1%206.4-5.8%2016.5.6%2022.6L399.2%20240H80z%22%2F%3E%3C%2Fsvg%3E"
              alt="Next"
              className="w-5 h-5"
            />
          </button>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: ".custom-prev", nextEl: ".custom-next" }}
          loop
          slidesPerView={3.3}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3.3, spaceBetween: 40 },
          }}
        >
          {content?.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white p-6 sm:p-8 mx-3 h-full shadow-sm">
                {/* Reviewer Info */}
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-medium text-black">
                    {t.reviewName}
                  </h3>
                  <p className="text-base sm:text-lg text-[#617798]">
                    {t.reviewDesignation}
                  </p>
                </div>

                {/* Review Text */}
                <p className="text-lg sm:text-xl leading-relaxed text-gray-700 mb-6">
                  {t.reviewText}
                </p>

                {/* Stars + Rating */}
                <div className="flex flex-col items-start gap-2">
                  <span className="text-lg sm:text-xl font-bold text-[#4c6fff]">
                    {t.reviewStar}
                  </span>
                  <span className="flex text-base sm:text-lg text-[#3b82f6]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <MdStar
                        key={index}
                        className={
                          index < t.reviewStar
                            ? "text-[#3b82f6]"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSection;
