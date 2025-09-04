import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { NavLink, Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [navitems, setNavitems] = useState([]);
  const [hoveredChild, setHoveredChild] = useState(null);
  const [isopen, setIsopen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isopenf, setIsopenf] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu state
  const [openDropdown, setOpenDropdown] = useState(null); // mobile dropdown state

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((data) => {
        setNavitems(data.page.mainNavigation || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <nav className="w-full p-3.5  bg-white shadow-sm fixed top-0 right-0 left-0 z-3">
        <div className="max-w-8xl  px-8 md:px-20 py-3.5 flex justify-between items-center mx-auto">
          {/* Logo */}
          <img
            src="https://t3-reva.t3planet.com/fileadmin/t3-reva/Logo/T3_Reva_Final_Logo.svg"
            className="cursor-pointer h-8"
            alt="logo"
          />

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-9 mr-4 items-center">
            {navitems.map((item) => (
              <div
                key={item.data.uid}
                className="relative flex group gap-2 justify-center items-center text-[#617798] cursor-pointer hover:text-gray-800 font-Work Sans"
              >
                <NavLink
                  to={item.data.slug}
                  className="cursor-pointer font-normal"
                >
                  {item.title}
                </NavLink>

                {item.children && item.children.length > 0 && (
                  <p className="cursor-pointer flex justify-center items-center mt-[3px] transition group-hover:rotate-180 duration-500">
                    <IoIosArrowDown />
                  </p>
                )}

                {/* Dropdown Menu (Desktop) */}
                {item.children && item.children.length > 0 && (
                  <div className="absolute top-full hidden group-hover:flex bg-white z-50">
                    {item.title === "Elements" ? (
                      <div className="mt-[33px] border-t border-gray-200 w-screen mr-[95px] shadow-md px-54 py-16 grid grid-cols-5 gap-9">
                        {item.children.map((child) => (
                          <div
                            key={child.data.uid}
                            className="flex flex-col gap-3"
                          >
                            <Link
                              className="text-blue-400 font-bold"
                              to={child.data.slug}
                            >
                              {child.title}
                            </Link>
                            <div className="flex flex-col gap-3">
                              {child.children?.map((sub) => (
                                <NavLink
                                  key={sub.data.uid}
                                  to={sub.data.slug}
                                  className="relative inline-block text-[#617798] font-Work Sans after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#4C6FFF] after:w-0 after:origin-left after:transition-all after:duration-300 hover:after:w-25 hover:after:origin-right"
                                >
                                  {sub.title}
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-[33px] border-t group border-gray-200 shadow-md px-6 w-48 py-6 flex flex-col gap-3">
                        {item.children.map((child) => (
                          <div
                            key={child.data.uid}
                            onMouseEnter={() =>
                              (child.title === "Header" ||
                                child.title === "Footer") &&
                              setHoveredChild(child.title)
                            }
                            onMouseLeave={() =>
                              (child.title === "Header" ||
                                child.title === "Footer") &&
                              setHoveredChild(null)
                            }
                            className="relative"
                          >
                            <div className="flex group justify-between items-center">
                              <Link
                                to={child.data.slug}
                                className="relative inline-block text-gray-500 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#4C6FFF] after:w-0 after:origin-left after:transition-all after:duration-300 hover:after:w-25 hover:after:origin-right"
                              >
                                {child.title}
                              </Link>
                              {(child.title === "Header" ||
                                child.title === "Footer") && (
                                <MdKeyboardArrowRight className="w-5 group h-5 mt-[4px]" />
                              )}
                            </div>

                            {/* Sub panel */}
                            {hoveredChild === child.title &&
                              child.children?.length > 0 && (
                                <div className="absolute border border-gray-300 left-full top-0 mt-0 shadow-md bg-white w-71 rounded-md flex flex-col gap-3 p-4">
                                  {child.children.map((sub) => (
                                    <div key={sub.data.uid}>
                                      <Link
                                        to={sub.data.slug}
                                        className="relative inline-block text-[#6177] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#4C6FFF] after:w-0 after:origin-left after:transition-all after:duration-300 hover:after:w-25 hover:after:origin-right"
                                      >
                                        <p>{sub.title}</p>
                                      </Link>
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Right side icons */}
            <div className="flex gap-8 z-50">
              <div className="flex relative justify-center items-center mt-1">
                {isopen ? (
                  <MdOutlineCancel
                    onClick={() => setIsopen(!isopen)}
                    className="h-[20px] cursor-pointer w-[20px]"
                  />
                ) : (
                  <FiSearch
                    onClick={() => setIsopen(!isopen)}
                    className="h-[19px] cursor-pointer w-[19px]"
                  />
                )}

                {isopen && (
                  <div className="absolute border border-gray-100 px-2 py-[7px] h-12 w-48 -left-40 bg-white  top-[53px]">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="px-2 py-1 outline-none w-36 rounded bg-gray-100"
                      />
                      <FiSearch
                        onClick={handleSearch}
                        className="h-[20px] cursor-pointer w-[20px]"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex relative justify-center items-center mt-1">
                <img
                  onClick={() => setIsopenf(!isopenf)}
                  src="https://t3-reva.vercel.app/_next/static/media/US.89d51ae2.png"
                  className="h-5 w-5 cursor-pointer"
                  alt="lang"
                />

                {isopenf && (
                  <div className="absolute border-t border-gray-200 w-11  px-2 py-[17px] h-24 shadow-sm bg-white  top-[53.5px]">
                    <div className="flex flex-col gap-5 justify-between items-center">
                      <img
                        src="https://t3-reva.vercel.app/_next/static/media/US.89d51ae2.png"
                        className="h-5 w-5 cursor-pointer"
                        alt="lang"
                      />
                      <img
                        src="https://t3-reva.vercel.app/_next/static/media/DE.e6358f84.png"
                        className="h-5 w-5 cursor-pointer"
                        alt="lang"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            {mobileOpen ? (
              <HiX
                className="h-7 w-7 cursor-pointer"
                onClick={() => setMobileOpen(false)}
              />
            ) : (
              <HiMenu
                className="h-7 w-7 cursor-pointer"
                onClick={() => setMobileOpen(true)}
              />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden flex flex-col gap-3 px-6 py-4 border-t bg-white shadow-md">
            {navitems.map((item) => (
              <div key={item.data.uid}>
                <button
                  className="flex justify-between items-center w-full text-gray-700 font-medium font-Work Sans"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.title ? null : item.title
                    )
                  }
                >
                  {item.title}
                  {item.children?.length > 0 && <IoIosArrowDown />}
                </button>

                {/* Dropdown in Mobile */}
                {openDropdown === item.title && item.children && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.data.uid}
                        to={child.data.slug}
                        className="text-gray-500"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Right side icons */}
            <div className="flex gap-6 items-center mt-4">
              <FiSearch className="h-5 w-5 cursor-pointer" />
              <img
                src="https://t3-reva.vercel.app/_next/static/media/US.89d51ae2.png"
                className="h-5 w-5 cursor-pointer"
                alt="lang"
              />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
