import React from "react";
import Navbar from "../../Components/Navbar";
import Themebar from "../../Components/Themebar";
import Footer from "../../Components/Footer";
import Main from "../../Components/Basic-Elements/Gallery/Main";

const Gallery = () => {
  return (
    <>
      <Navbar />
      <Themebar/>
      <div className="relative">
        <Main/>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
