import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import HousesForSale from "./HousesForSale";
import ApartmentsForSale from "./ApartmentsForSale";
import HousesForRent from "./HousesForRent";
import ApartmentsForRent from "./ApartmentsForRent";
import Footer from "./Footer";

export default function LandingPage() {

  return (
    <>
      <Navbar />
      <HeroSection />
      <HousesForSale />
      <ApartmentsForSale />
      <HousesForRent />
      <ApartmentsForRent />
      <Footer />
    </>
  );
}
