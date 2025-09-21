import React from "react";
import Navbar from "../../Components/Navbar";
import Themebar from "../../Components/Themebar";
import Main3 from "../../Components/Basic-Elements/Pricing-Plans/Main3"
import Card1 from "../../Components/Basic-Elements/Pricing-Plans/Card1"
import Card2 from "../../Components/Basic-Elements/Pricing-Plans/Card2"
import Footer from "../../Components/Footer";

const PricingPlans = () => {
  return (
    <>
      <Navbar />
      <Themebar/>
      <div>
        <Main3 />
        <Card1/>
        <Card2/>
      </div>
      <Footer />
    </>
  );
};

export default PricingPlans;
