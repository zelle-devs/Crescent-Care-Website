

import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import ServicesCards from "@/components/Services/ServicesCards";

import servicesData from "@/data/servicesData";

export default function Services() {
  return (
    <>
      <HeroSection slides={servicesData} showWave={true} height="70vh"/>
      <ServicesCards/>
    </>
  );
}