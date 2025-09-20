import React from "react";
import Navbar from "../../Components/Navbar";
import Themebar from "../../Components/Themebar";
import Footer from "../../Components/Footer";
import Main from "../../Components/Basic-Elements/Gallery/Main";
import Slider from "../../Components/Basic-Elements/Gallery/Slider"
import Grid from "../../Components/Basic-Elements/Gallery/Grid"

const Gallery = () => {
  return (
    <>
      <Navbar />
      <Themebar/>
      <div className="relative">
        <Main/>
        <Slider/>
        <Grid/>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
