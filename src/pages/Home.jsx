import React from "react";
import Navbar from "../Components/Navbar";
import HeroSection from "../Components/HeroSection";
import PreBuiltSection from "../Components/PreBuiltSection";
import CardSection from "../Components/CardSection";
import CounterSection from "../Components/CounterSection";
import OneClickSection from "../Components/OneClickSection";
import EasyIntrectionCard from "../Components/EasyIntrectionCard"
import FluidAndResponsive from "../Components/FluidAndResponsive";
import LayoutsSection from "../Components/LayoutsSection"
import FeaturesCard from "../Components/FeaturesCard"
import Footer from "../Components/Footer"

import ScrollToTop from "../Components/ScrollToTop";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />

      {/* Background wrapper with two vertical lines */}
        <PreBuiltSection />
        <CardSection />
        <CounterSection/>
        <OneClickSection/>
        <EasyIntrectionCard/>
        <FluidAndResponsive/>
        <LayoutsSection/>
        <FeaturesCard/>
    
        <Footer/>
        

      <ScrollToTop />
    </>
  );
      // <div className="relative bg-white">
      //   {/* Left vertical line */}
      //   <div className="absolute top-0 bottom-0 left-107 w-px bg-gray-200" />
      //   {/* Right vertical line */}
      //   <div className="absolute top-0 bottom-0 right-123 w-px bg-gray-200" />

      // </div>
};

export default Home;
